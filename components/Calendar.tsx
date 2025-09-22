import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

import CalendarIcon from './icons/CalendarIcon';
import Chevron from './icons/Chevron';
import Button from './ui/Button';
interface CalendarProps {
  onSave?: (start: string, end: string) => void;
  initialSelection?: {
    start?: string;
    end?: string;
  };
  disabled?: boolean;
}

interface DateSelection {
  start: string;
  end: string;
}

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}
const ArrowIcon = (direction: 'left' | 'right') => (
  <View
    style={
      direction === 'right'
        ? [{ transform: [{ rotate: '180deg' }] }, styles.moveLeft]
        : styles.moveRight
    }
  >
    <Chevron />
  </View>
);

const getModalPosition = (triggerLayout: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calendarWidth = 328;
  const calendarHeight = 400;

  let left = triggerLayout.x;
  let top = triggerLayout.y;

  if (left + calendarWidth > screenWidth) {
    left = screenWidth - calendarWidth - 16;
  }

  if (top + calendarHeight > screenHeight) {
    top = triggerLayout.y - calendarHeight - 8;
  }

  return { left: Math.max(16, left), top: Math.max(16, top) };
};

const Calendar: React.FC<CalendarProps> = ({ onSave, initialSelection, disabled = false }) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<DateSelection>({
    start: initialSelection?.start || '',
    end: initialSelection?.end || '',
  });
  const triggerRef = React.useRef<View>(null);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const today = new Date();

  const handleDayPress = (day: { dateString: string }) => {
    if (!selected.start || (selected.start && selected.end)) {
      setSelected({ start: day.dateString, end: '' });
    } else if (selected.start && !selected.end) {
      const startDate = new Date(selected.start);
      const endDate = new Date(day.dateString);
      if (endDate > startDate) {
        setSelected({ ...selected, end: day.dateString });
      } else {
        setSelected({ start: day.dateString, end: '' });
      }
    }
  };

  const getMarkedDates = (): MarkedDates => {
    const markedDates: MarkedDates = {};
    if (selected.start) {
      markedDates[selected.start] = {
        startingDay: true,
        color: Colors.brand.primary,
        textColor: Colors.text.white,
      };
    }
    if (selected.end) {
      markedDates[selected.end] = {
        endingDay: true,
        color: Colors.brand.primary,
        textColor: Colors.text.white,
      };
      const currentDate = new Date(selected.start);
      const endDate = new Date(selected.end);
      const startTime = currentDate.getTime();
      const endTime = endDate.getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

      for (let time = startTime + oneDay; time < endTime; time += oneDay) {
        const date = new Date(time);
        const dateString = date.toISOString().split('T')[0];
        if (dateString) {
          markedDates[dateString] = {
            color: Colors.brand.primary,
            textColor: Colors.text.white,
          };
        }
      }
    }
    return markedDates;
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const triggerLabel = selected.start
    ? selected.end
      ? `${formatDate(selected.start)} - ${formatDate(selected.end)}`
      : `${formatDate(selected.start)} - `
    : t('common.selectDate');
  return (
    <>
      <Button
        onPress={() => {
          triggerRef.current?.measureInWindow((x, y, width, height) => {
            if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
              setTriggerLayout({ x, y, width, height });
              setIsVisible(true);
            }
          });
        }}
        variant='secondary'
        size={'sm'}
        disabled={disabled}
        ref={triggerRef}
      >
        <View style={styles.row}>
          <CalendarIcon />
          <Text>{triggerLabel}</Text>
        </View>
      </Button>

      <Modal animationType='fade' transparent={true} visible={isVisible}>
        <View
          style={[
            styles.calendar,
            {
              top: triggerLayout.y,
              left: triggerLayout.x,
            },
            getModalPosition(triggerLayout),
          ]}
        >
          <View style={styles.body}>
            <RNCalendar
              markingType='period'
              // Customize the appearance of the calendar
              renderArrow={direction => ArrowIcon(direction)}
              // Specify the current date
              current={today.toISOString()}
              // Callback that gets called when the user selects a day
              onDayPress={handleDayPress}
              // Mark specific dates as marked
              theme={{
                dayTextColor: Colors.text.secondary,
                selectedDayTextColor: Colors.text.secondary,
                textDisabledColor: Colors.text.disabled,
                monthTextColor: Colors.text.secondary,
                textMonthFontWeight: '600',
                textMonthFontSize: 16,
                textSectionTitleColor: Colors.text.secondary,
                disabledDotColor: Colors.icon.secondary,
                todayTextColor: Colors.text.secondary,
              }}
              headerStyle={styles.zeroPadding}
              markedDates={getMarkedDates()}
            />
          </View>
          <View style={styles.footer}>
            <Button
              onPress={() => {
                // TODO: Add onSave prop and call it with selected range
                setIsVisible(false);
              }}
              variant='secondary'
              size={'md'}
              style={styles.flex}
            >
              {t('common.cancel')}
            </Button>
            <Button
              onPress={() => {
                setIsVisible(false);
                onSave && selected.start && onSave(selected.start, selected.end);
              }}
              variant='primary'
              size={'md'}
              style={styles.flex}
            >
              {t('common.save')}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Calendar;
const styles = StyleSheet.create({
  flex: { flex: 1 },
  calendar: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    width: 328,
    maxWidth: '90%',
    borderRadius: 12,
    marginTop: 50,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xl03,
    ...Shadows.shadow_xl02,
    ...Shadows.shadow_xl01,
  },
  body: {
    paddingInline: 24,
    paddingVertical: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.disabledBorder,
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moveLeft: {
    marginRight: -10,
  },
  moveRight: {
    marginLeft: -10,
  },
  zeroPadding: { paddingHorizontal: 0 },
});
