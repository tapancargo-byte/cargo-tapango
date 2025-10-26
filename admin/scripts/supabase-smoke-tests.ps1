param(
  [string]$SupabaseUrl = $env:SUPABASE_URL,
  [string]$AnonKey = $env:SUPABASE_ANON_KEY,
  [string]$BearerToken = $env:SUPABASE_BEARER_TOKEN
)

if (-not $SupabaseUrl -or -not $AnonKey -or -not $BearerToken) {
  Write-Host "Usage: set env SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_BEARER_TOKEN, then run this script." -ForegroundColor Yellow
  Write-Host "Example:" -ForegroundColor Yellow
  Write-Host "$env:SUPABASE_URL=https://<project>.supabase.co; $env:SUPABASE_ANON_KEY={{SUPABASE_ANON_KEY}}; $env:SUPABASE_BEARER_TOKEN={{BEARER_TOKEN}}" -ForegroundColor Yellow
  exit 1
}

$Headers = @{ "apikey" = $AnonKey; "Authorization" = "Bearer $BearerToken" }

function Test-Endpoint {
  param(
    [string]$Name,
    [string]$Path
  )
  $url = "$SupabaseUrl/rest/v1/$Path"
  try {
    $resp = Invoke-WebRequest -Uri $url -Headers $Headers -Method GET -UseBasicParsing
    $rid = $resp.Headers["x-request-id"]
    Write-Host ("[OK] {0} -> {1} (x-request-id={2})" -f $Name, $resp.StatusCode, $rid)
    return 0
  } catch {
    $err = $_.Exception.Response
    if ($null -ne $err) {
      $code = $err.StatusCode.value__
      $stream = $err.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($stream)
      $body = $reader.ReadToEnd()
      $rid = $err.Headers["x-request-id"]
      Write-Host ("[FAIL] {0} -> {1} (x-request-id={2})" -f $Name, $code, $rid) -ForegroundColor Red
      Write-Host $body -ForegroundColor DarkRed
    } else {
      Write-Host ("[FAIL] {0} -> no response" -f $Name) -ForegroundColor Red
    }
    return 1
  }
}

# Smoke tests
$rc = 0
$rc += Test-Endpoint -Name "profiles (customers)" -Path "profiles?select=id,email,role&role=eq.customer&limit=1"
$rc += Test-Endpoint -Name "orders (with embeds)" -Path "orders?select=id,status,total_price,customer:profiles!orders_customer_id_fkey(id,email),driver:drivers(id)&limit=1"
$rc += Test-Endpoint -Name "invoices (with customer embed)" -Path "invoices?select=id,status,total_amount,customer_profile:profiles!invoices_customer_id_fkey(id,email)&limit=1"
$rc += Test-Endpoint -Name "notifications (with user embed)" -Path "notifications?select=id,type,title,user_profile:profiles!notifications_user_id_fkey(name,email)&limit=1"
$rc += Test-Endpoint -Name "tracking_events (ordered)" -Path "tracking_events?select=*&order=created_at.desc&limit=1"

if ($rc -eq 0) {
  Write-Host "All smoke tests passed." -ForegroundColor Green
  exit 0
} else {
  Write-Host "Some smoke tests failed." -ForegroundColor Yellow
  exit 2
}
