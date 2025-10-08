import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = { start?: string | undefined; end?: string | undefined };

const useChartData = (date: Props) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<
    { month: string; listenCount: number; like: number; dislike: number }[]
  >([]);
  useEffect(() => {
    const getMonthName = () => {
      const startDate = date.start ? new Date(date.start) : null;
      const endDate = date.end ? new Date(date.end) : null;
      const startingMonth = startDate && !isNaN(startDate.getTime()) ? startDate.getMonth() : null;
      const endingMonth = endDate && !isNaN(endDate.getTime()) ? endDate.getMonth() : null;
      return [startingMonth, endingMonth];
    };
    const getYearName = () => {
      const startDate = date.start ? new Date(date.start) : null;
      const endDate = date.end ? new Date(date.end) : null;
      const startingYear =
        startDate && !isNaN(startDate.getTime()) ? startDate.getFullYear() : null;
      const endingYear = endDate && !isNaN(endDate.getTime()) ? endDate.getFullYear() : null;

      return [startingYear, endingYear];
    };
    const data = [
      { month: t('months.january'), listenCount: 30, like: 50, dislike: 70 },
      { month: t('months.february'), listenCount: 35, like: 0, dislike: 90 },
      { month: t('months.march'), listenCount: 18, like: 38, dislike: 46 },
      { month: t('months.april'), listenCount: 30, like: 50, dislike: 70 },
      { month: t('months.may'), listenCount: 40, like: 50, dislike: 50 },
      { month: t('months.june'), listenCount: 43, like: 70, dislike: 40 },
      { month: t('months.july'), listenCount: 50, like: 30, dislike: 20 },
      { month: t('months.august'), listenCount: 70, like: 60, dislike: 30 },
      { month: t('months.september'), listenCount: 40, like: 20, dislike: 10 },
      { month: t('months.october'), listenCount: 60, like: 50, dislike: 20 },
      { month: t('months.november'), listenCount: 75, like: 80, dislike: 30 },
      { month: t('months.december'), listenCount: 50, like: 30, dislike: 40 },
    ];
    const [startMonth, endMonth] = getMonthName();
    const [startYear, endingYear] = getYearName();
    const filtered = data.filter((_, index) => {
      if (startYear && startYear < 2025 && !endingYear) {
        return startMonth !== null && startMonth !== undefined ? index >= startMonth : true;
      }
      if (startMonth === null || endMonth === null) return true;
      if (startMonth === undefined || endMonth === undefined) return true;
      if (startMonth === endMonth) {
        return index === startMonth;
      }
      if (startMonth < endMonth) {
        return index >= startMonth && index <= endMonth;
      }
      return index >= startMonth || index <= endMonth;
    });

    setChartData(filtered);
  }, [date, setChartData, t]);

  return chartData;
};

export default useChartData;
