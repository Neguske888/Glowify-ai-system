import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TimeRange = 'Today' | 'Yesterday' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days' | 'Month' | 'Quarter' | 'Year' | 'Custom Range';

interface DashboardContextType {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  customRange: { start: Date; end: Date } | null;
  setCustomRange: (range: { start: Date; end: Date } | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('Last 30 Days');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | null>(null);

  return (
    <DashboardContext.Provider value={{ timeRange, setTimeRange, customRange, setCustomRange }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
