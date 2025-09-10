import React, { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar, TrendingUp, BarChart3, PieChart as PieChartIcon, Clock } from 'lucide-react'
import { useTheme } from '../../providers/ThemeProvider'

// Sample data - in real app this would come from API
const generateSampleData = (days: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = []
  const baseDate = new Date()
  baseDate.setDate(baseDate.getDate() - days)
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000) + 2000,
      orders: Math.floor(Math.random() * 50) + 20,
      customers: Math.floor(Math.random() * 30) + 10,
      drivers: Math.floor(Math.random() * 15) + 5,
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate(),
    })
  }
  
  return data
}

const orderStatusData = [
  { name: 'Completed', value: 65, color: '#10b981' },
  { name: 'In Transit', value: 20, color: '#3b82f6' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
  { name: 'Cancelled', value: 3, color: '#ef4444' },
]

interface InteractiveChartProps {
  title: string
  type: 'area' | 'bar' | 'pie'
  dataKey: keyof ChartDataPoint
  timeRange?: '7d' | '30d' | '90d' | '1y'
}

interface ChartDataPoint {
  date: string
  revenue: number
  orders: number
  customers: number
  drivers: number
  month: string
  day: number
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title,
  type,
  dataKey,
  timeRange = '30d'
}) => {
  const { theme } = useTheme()
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange)
  const [chartType, setChartType] = useState(type)

  const timeRangeOptions = [
    { value: '7d', label: '7 days', days: 7 },
    { value: '30d', label: '30 days', days: 30 },
    { value: '90d', label: '90 days', days: 90 },
    { value: '1y', label: '1 year', days: 365 },
  ]

  const data = useMemo(() => {
    const range = timeRangeOptions.find(r => r.value === selectedTimeRange)
    return generateSampleData(range?.days || 30)
  }, [selectedTimeRange])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border shadow-lg ${
          theme === 'dark' 
            ? 'bg-slate-800 border-slate-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <p className="font-medium mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} style={{ color: item.color }} className="text-sm">
              {`${item.name}: ${item.name.includes('Revenue') ? '$' : ''}${item.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const cardClasses = theme === 'dark'
    ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border-slate-700/50'
    : 'bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-300/60 shadow-lg'

  const textClasses = theme === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleClasses = theme === 'dark' ? 'text-slate-400' : 'text-gray-600'

  const renderChart = () => {
    const chartProps = {
      width: '100%',
      height: 300,
      data: chartType === 'pie' ? orderStatusData : data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer {...chartProps}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
              />
              <XAxis 
                dataKey="date" 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer {...chartProps}>
            <BarChart data={data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
              />
              <XAxis 
                dataKey="date" 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer {...chartProps}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#ffffff' : '#1f2937'
                }}
              />
              <Legend 
                wrapperStyle={{
                  color: theme === 'dark' ? '#ffffff' : '#1f2937'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <Card className={`${cardClasses} shadow-2xl`}>
      <CardHeader className={`border-b ${theme === 'dark' ? 'border-slate-700/30' : 'border-gray-200'} pb-4`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-3 ${textClasses}`}>
            <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg">
              {chartType === 'area' && <TrendingUp className="h-4 w-4 text-white" />}
              {chartType === 'bar' && <BarChart3 className="h-4 w-4 text-white" />}
              {chartType === 'pie' && <PieChartIcon className="h-4 w-4 text-white" />}
            </div>
            <span className="text-lg font-semibold">{title}</span>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {/* Chart Type Selector */}
            <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
              </SelectContent>
            </Select>

            {/* Time Range Selector */}
            {chartType !== 'pie' && (
              <Select value={selectedTimeRange} onValueChange={(value) => setSelectedTimeRange(value as '7d' | '30d' | '90d' | '1y')}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <p className={`${subtitleClasses} text-sm`}>
          {chartType === 'pie' ? 'Order status distribution' : `${title.toLowerCase()} over time`}
        </p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="h-[300px]">
          {renderChart()}
        </div>
        
        {/* Chart Statistics */}
        <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-slate-700/30' : 'border-gray-200'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className={`text-2xl font-bold ${textClasses}`}>
                {chartType === 'pie' ? '85%' : data.reduce((sum, item) => sum + (item[dataKey] as number), 0).toLocaleString()}
              </p>
              <p className={`text-xs ${subtitleClasses}`}>
                {chartType === 'pie' ? 'Success Rate' : 'Total'}
              </p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${textClasses}`}>
                +12.5%
              </p>
              <p className={`text-xs ${subtitleClasses}`}>vs Previous</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${textClasses}`}>
                {Math.max(...data.map(item => item[dataKey] as number)).toLocaleString()}
              </p>
              <p className={`text-xs ${subtitleClasses}`}>Peak Value</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${textClasses}`}>
                {Math.round(data.reduce((sum, item) => sum + (item[dataKey] as number), 0) / data.length).toLocaleString()}
              </p>
              <p className={`text-xs ${subtitleClasses}`}>Average</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
