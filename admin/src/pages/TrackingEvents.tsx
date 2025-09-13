import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { useTrackingEvents } from '../hooks/useTrackingEvents';
import { toCSV } from '../lib/csv';
import { Activity, Calendar, Search } from 'lucide-react';

const TrackingEvents: React.FC = () => {
  const [filters, setFilters] = useState<{ tracking_code: string; date_from?: string; date_to?: string }>({
    tracking_code: '',
    date_from: undefined,
    date_to: undefined,
  });

  const { data: events = [], isLoading } = useTrackingEvents({
    date_from: filters.date_from,
    date_to: filters.date_to,
  });

  const filtered = useMemo(() => {
    const code = filters.tracking_code.trim().toLowerCase();
    return events.filter((e: any) => {
      const candidate = (e.tracking_code || e.tracking_id || '').toString().toLowerCase();
      return !code || candidate.includes(code);
    });
  }, [events, filters.tracking_code]);

  const exportCsv = () => {
    const cols = [
      { key: 'created_at', label: 'Time', map: (r: any) => r.created_at || '' },
      { key: 'tracking_code', label: 'Tracking', map: (r: any) => r.tracking_code || r.tracking_id || '' },
      { key: 'type', label: 'Type', map: (r: any) => r.type || r.event_type || '' },
      { key: 'status', label: 'Status', map: (r: any) => r.status || '' },
      { key: 'details', label: 'Details', map: (r: any) => JSON.stringify(r.payload || r).slice(0, 200) },
    ];
    const csv = toCSV(filtered || [], cols);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'tracking_events.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tracking Events</h1>
          <p className="text-muted-foreground">View and filter tracking events for orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tracking code..."
                  value={filters.tracking_code}
                  onChange={(e) => setFilters({ ...filters, tracking_code: e.target.value })}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From</label>
              <Input type="date" value={filters.date_from || ''} onChange={(e) => setFilters({ ...filters, date_from: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To</label>
              <Input type="date" value={filters.date_to || ''} onChange={(e) => setFilters({ ...filters, date_to: e.target.value })} />
            </div>
            <div className="ml-auto">
              <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                {filtered.length} event(s) found
              </CardDescription>
            </div>
            <div>
              <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">Loading events...</TableCell>
                </TableRow>
              ) : filtered.length > 0 ? (
                filtered.map((e: any, idx: number) => (
                  <TableRow key={(e.id || idx) + ''}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {e.created_at ? new Date(e.created_at).toLocaleString() : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>{e.tracking_code || e.tracking_id || ''}</TableCell>
                    <TableCell>{e.type || e.event_type || 'event'}</TableCell>
                    <TableCell>
                      <pre className="text-xs whitespace-pre-wrap max-w-[520px] overflow-hidden text-ellipsis">
                        {JSON.stringify(e.payload || e)}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No events found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingEvents;
