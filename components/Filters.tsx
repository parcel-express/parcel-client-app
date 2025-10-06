import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Status, Tab } from '@/app/types/orderTypes';

import Calendar from './Calendar';
import SearchIcon from './icons/SearchIcon';
import ShortCutIcon from './icons/ShortCutIcon';
import Input from './ui/Input';
import Select from './ui/Select';
import TabSwitcher from './ui/TabSwitcher';

type Props = {
  formik: FormikProps<{ search: string }>;
  setDate: (date: { start?: string; end?: string }) => void;
  date: { start?: string; end?: string };
  status: Status | 'status';
  setStatus: (status: Status | 'status') => void;
  tab: Tab;
  setTab: (tab: Tab) => void;
  options: { label: string; value: string }[];
  tabs?: { label: string; value: Tab }[];
};

const Filters = ({ formik, setDate, status, setStatus, tab, setTab, options, tabs }: Props) => {
  return (
    <>
      <Input
        name={'search'}
        leftIcon={<SearchIcon />}
        rightIcon={<ShortCutIcon />}
        formik={formik}
        placeholder='Search'
      />
      <View style={styles.row}>
        <View style={styles.container}>
          <Calendar
            onSave={(start, end) =>
              setDate({ ...(start ? { start } : {}), ...(end ? { end } : {}) })
            }
          />
        </View>
        <View>
          <Select
            variant='secondary'
            placeholder='status'
            options={options}
            value={status}
            setValue={(value: string) => setStatus(value as Status)}
            size='sm'
          />
        </View>
      </View>
      {tabs && <TabSwitcher tabs={tabs} activeTab={tab} onChange={val => setTab(val)} />}
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
});
