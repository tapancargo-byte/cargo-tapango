param(
  [string]$SupabaseUrl = $env:SUPABASE_URL,
  [string]$AnonKey = $env:SUPABASE_ANON_KEY,
  [string]$AdminToken = $env:SUPABASE_ADMIN_BEARER_TOKEN,
  [string]$UserToken = $env:SUPABASE_USER_BEARER_TOKEN
)

function Decode-JwtSub {
  param([string]$Token)
  if (-not $Token) { return $null }
  $parts = $Token.Split('.')
  if ($parts.Length -lt 2) { return $null }
  $payload = $parts[1].Replace('-', '+').Replace('_', '/')
  switch ($payload.Length % 4) {
    2 { $payload += '==' }
    3 { $payload += '=' }
  }
  $bytes = [Convert]::FromBase64String($payload)
  $json = [Text.Encoding]::UTF8.GetString($bytes)
  try { return (ConvertFrom-Json $json).sub } catch { return $null }
}

if (-not $SupabaseUrl -or -not $AnonKey -or -not $AdminToken -or -not $UserToken) {
  Write-Host "Usage: set SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_ADMIN_BEARER_TOKEN, SUPABASE_USER_BEARER_TOKEN then run this script." -ForegroundColor Yellow
  exit 1
}

$AdminHeaders = @{ "apikey" = $AnonKey; "Authorization" = "Bearer $AdminToken" }
$UserHeaders  = @{ "apikey" = $AnonKey; "Authorization" = "Bearer $UserToken" }

$UserSub = Decode-JwtSub -Token $UserToken
if (-not $UserSub) { Write-Host "Could not decode sub from user token" -ForegroundColor Red; exit 1 }

function Invoke-Check {
  param([string]$Name,[string]$Path,[hashtable]$Headers)
  $url = "$SupabaseUrl/rest/v1/$Path"
  try {
    $resp = Invoke-WebRequest -Uri $url -Headers $Headers -Method GET -UseBasicParsing
    $rid = $resp.Headers["x-request-id"]
    Write-Host ("[OK] {0} -> {1} (x-request-id={2})" -f $Name, $resp.StatusCode, $rid)
    return 0
  } catch {
    $err = $_.Exception.Response
    $code = $err.StatusCode.value__
    $stream = $err.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $body = $reader.ReadToEnd()
    $rid = $err.Headers["x-request-id"]
    Write-Host ("[FAIL] {0} -> {1} (x-request-id={2})" -f $Name, $code, $rid) -ForegroundColor Red
    Write-Host $body -ForegroundColor DarkRed
    return 1
  }
}

$rc = 0
# Admin should read lists with embeds
$rc += Invoke-Check -Name "admin: orders list" -Path "orders?select=id,status,total_price&limit=1" -Headers $AdminHeaders
$rc += Invoke-Check -Name "admin: invoices list" -Path "invoices?select=id,status,total_amount&limit=1" -Headers $AdminHeaders
$rc += Invoke-Check -Name "admin: profiles list" -Path "profiles?select=id,email,role&limit=1" -Headers $AdminHeaders
$rc += Invoke-Check -Name "admin: notifications list" -Path "notifications?select=id,type,title&limit=1" -Headers $AdminHeaders
$rc += Invoke-Check -Name "admin: tracking events" -Path "tracking_events?select=*&order=created_at.desc&limit=1" -Headers $AdminHeaders

# Non-admin should only see own profile row and own-scoped data
$rc += Invoke-Check -Name "user: own profile" -Path "profiles?select=id,email,role&id=eq.$UserSub" -Headers $UserHeaders
$rc += Invoke-Check -Name "user: notifications (own)" -Path "notifications?select=id,type,title&limit=1" -Headers $UserHeaders
$rc += Invoke-Check -Name "user: orders (may be 200 with 0 rows)" -Path "orders?select=id,status&limit=1" -Headers $UserHeaders

if ($rc -eq 0) { Write-Host "RLS checks passed." -ForegroundColor Green; exit 0 } else { Write-Host "Some RLS checks failed." -ForegroundColor Yellow; exit 2 }
