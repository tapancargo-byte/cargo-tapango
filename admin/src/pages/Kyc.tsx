import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

interface Row { name: string; last_modified: string; status?: string }

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

export default function Kyc() {
  const { isAdmin } = useAuth();
  const [items, setItems] = React.useState<Row[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [search, setSearch] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [openName, setOpenName] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (!supabase || !isAdmin) return;
    const { data, error } = await supabase.storage.from('kyc').list('', { limit: 100, search: search || undefined });
    if (!error && data) {
      const { data: reviews } = await (supabase as any).from('kyc_reviews').select('path,status');
      const map = new Map<string, string>((reviews ?? []).map((r: any) => [r.path, r.status]));
      setItems((data as any).map((d: any) => ({ ...d, status: map.get(d.name) ?? 'pending' })));
    } else setItems([]);
  }, [isAdmin, search]);

  React.useEffect(() => { load(); }, [load]);

  const filtered = items.filter(r => statusFilter === 'all' || (r.status ?? 'pending') === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="kyc-title">KYC Review</h1>
          <p className="text-muted-foreground">Moderate driver identity documents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle data-testid="kyc-filters">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="min-w-[220px]">
              <label className="block text-xs text-muted-foreground mb-1">Search</label>
              <Input placeholder="Search filename" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Status</label>
              <select className="border rounded h-9 px-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <Button onClick={load}>Reload</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle data-testid="kyc-docs">Documents ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={`${r.name}-${r.last_modified}`}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-gray-100 dark:bg-gray-800 border border-gray-300/50">
                      {r.status ?? 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(r.last_modified).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={async () => {
                        const { data } = await supabase.storage.from('kyc').createSignedUrl(r.name, 300);
                        setPreviewUrl((data as any)?.signedUrl ?? null);
                        setOpenName(r.name);
                      }}>Preview</Button>
                      <Button variant="outline" onClick={async () => {
                        const { data } = await supabase.storage.from('kyc').createSignedUrl(r.name, 600);
                        const url = (data as any)?.signedUrl; if (url) window.open(url, '_blank');
                      }}>Download</Button>
                      <Button onClick={async () => {
                        const { data } = await supabase.auth.getUser();
                        const reviewer = (data as any)?.user?.email ?? (data as any)?.user?.id ?? 'admin';
                        await (supabase as any).from('kyc_reviews').upsert({ path: r.name, status: 'approved', reviewed_by: reviewer });
                        await load();
                      }}>Approve</Button>
                      <Button variant="destructive" onClick={async () => {
                        const { data } = await supabase.auth.getUser();
                        const reviewer = (data as any)?.user?.email ?? (data as any)?.user?.id ?? 'admin';
                        await (supabase as any).from('kyc_reviews').upsert({ path: r.name, status: 'rejected', reviewed_by: reviewer });
                        await load();
                      }}>Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {previewUrl && openName && (
            <div className="mt-4">
              <div className="text-sm text-muted-foreground">Preview: {openName}</div>
              <img src={previewUrl} alt="Preview" className="mt-2 rounded border max-h-[420px]" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
