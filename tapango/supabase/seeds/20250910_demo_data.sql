-- Demo seed data
insert into public.orders (route, price, status)
values ('Mumbai → Pune', 12500, 'Active'), ('Delhi → Jaipur', 8800, 'Past')
on conflict do nothing;

insert into public.tracking_events (tracking_id, timestamp, location, description, status) values
('TPG123456789', now() - interval '3 days', 'New York, NY', 'Package picked up from sender', 'confirmed'),
('TPG123456789', now() - interval '2 days', 'Chicago, IL', 'In transit to next hub', 'in-transit'),
('TPG123456789', now() - interval '1 day', 'Phoenix, AZ', 'Package arrived at Phoenix distribution center', 'in-transit')
on conflict do nothing;
