import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import type { MarkedDates } from 'react-native-calendars/src/types';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

import CalendarIcon from './icons/CalendarIcon';
import Chevron from './icons/Chevron';
import Button from './ui/Button';
const Calendar = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState({
    start: '',
    end: '',
  });
  const triggerRef = React.useRef<View>(null);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });
  const today = new Date();
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
      currentDate.setDate(currentDate.getDate() + 1);
      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (typeof dateString === 'string') {
          markedDates[dateString] = { color: Colors.brand.primary, textColor: Colors.text.white };
        }
        currentDate.setDate(currentDate.getDate() + 1);
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
    <View style={styles.full}>
      <View ref={triggerRef} style={[styles.full, styles.maxWidth]}>
        <Button
          onPress={() => {
            triggerRef.current?.measureInWindow((x, y, width, height) => {
              setTriggerLayout({ x, y, width, height });
              setIsVisible(true);
            });
          }}
          variant='secondary'
          size={'sm'}
        >
          <View style={styles.row}>
            <CalendarIcon />
            <Text>{triggerLabel}</Text>
          </View>
        </Button>
      </View>

      <Modal animationType='fade' transparent={true} visible={isVisible}>
        <View
          style={[
            styles.calendar,
            {
              top: triggerLayout.y,
              left: triggerLayout.x,
            },
          ]}
        >
          <View style={styles.body}>
            <RNCalendar
              markingType='period'
              // Customize the appearance of the calendar
              renderArrow={ArrowIcon}
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
            >
              {t('common.cancel')}
            </Button>
            <Button
              onPress={() => {
                setIsVisible(false);
              }}
              variant='primary'
              size={'md'}
            >
              {t('common.save')}
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;
const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
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
  maxWidth: { maxWidth: 328 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  moveLeft: {
    marginRight: -10,
  },
  moveRight: {
    marginLeft: -10,
  },
  zeroPadding: { paddingHorizontal: 0 },
});
