import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import { Support } from '@/app/types/cardTypes';
import { Status, Tab } from '@/app/types/orderTypes';
import ContentView from '@/components/ContentView';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import DownloadIcon from '@/components/icons/DownloadIcon';
import SettingsButton from '@/components/SettingsButton';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import NotificationsModal from '@/components/ui/NotificationsModal';
import Select from '@/components/ui/Select';
import { Colors } from '@/constants/Colors';

const SupportPage = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => {
      // TO DO: Implement search functionality
    },
  });
  const [isModalVisible, setModalIsVisible] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>('Ongoing');
  const [status, setStatus] = React.useState<Status | 'status'>('status');
  const [subject, setSubject] = React.useState<string>('subject');
  // const [search, setSearch] = React.useState('');
  const [date, setDate] = React.useState<{ start?: string; end?: string }>({});
  const { t } = useTranslation();
  const options = [
    { label: t('profile.support.filters.status.all'), value: 'all' },
    { label: t('profile.support.filters.status.open'), value: 'open' },
    { label: t('profile.support.filters.status.closed'), value: 'closed' },
  ];

  const data: Support[] = [
    {
      id: '1',
      title: '#12345',
      status: t('status.open'),
      statusVariant: 'success',
      date: [
        { label: t('profile.support.labels.dateCreated'), value: '2023-10-01' },
        { label: t('profile.support.labels.seen'), value: '2023-10-05' },
      ],
      body: [
        { label: t('profile.support.labels.name'), value: 'John Doe' },
        {
          label: t('profile.support.labels.ticketNumber'),
          value: '1558',
        },
      ],
    },
    {
      id: '2',
      title: '#67890',
      status: t('status.open'),
      statusVariant: 'success',
      date: [
        { label: t('profile.support.labels.dateCreated'), value: '2023-09-15' },
        { label: t('profile.support.labels.seen'), value: '2023-09-20' },
      ],
      body: [
        { label: t('profile.support.labels.name'), value: 'Jane Smith' },
        {
          label: t('profile.support.labels.ticketNumber'),
          value: '1623',
        },
      ],
    },
    {
      id: '3',
      title: '#54321',
      status: t('status.closed'),
      statusVariant: 'danger',
      date: [
        { label: t('profile.support.labels.dateCreated'), value: '2023-08-10' },
        { label: t('profile.support.labels.seen'), value: '2023-08-15' },
      ],
      body: [
        { label: t('profile.support.labels.name'), value: 'Alice Johnson' },
        {
          label: t('profile.support.labels.ticketNumber'),
          value: '1789',
        },
      ],
    },
  ];
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => (setModalIsVisible(false), null);

  return (
    <ThemedView style={styles.container}>
      <Header title={t('profile.support.title')} hasGoBack />
      <NotificationsModal visible={isModalVisible} onClose={closeModal} />
      <ContentView>
        <View style={styles.filtersContainer}>
          <SettingsButton onPress={openModal}>ახალი მიმართვა</SettingsButton>
          <Filters
            formik={formik}
            setDate={setDate}
            date={date}
            status={status}
            setStatus={setStatus}
            tab={tab}
            setTab={setTab}
            options={options}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <View>
              <Select
                setValue={value => setSubject(value)}
                value={subject}
                options={[
                  {
                    label: t('profile.support.labels.chooseTopic'),
                    value: 'subject',
                  },
                  {
                    label: t('profile.support.labels.anotherSubject'),
                    value: 'another',
                  },
                ]}
                size='sm'
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button size={'sm'} variant={'secondary'} leftIcon={<DownloadIcon />}>
                {t('profile.support.labels.download')}
              </Button>
            </View>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => <Card data={item} variant='support' />}
          contentContainerStyle={styles.body}
        />
      </ContentView>
    </ThemedView>
  );
};

export default SupportPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    gap: 10,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.borderLight,
  },
  body: {
    paddingHorizontal: 18,
    gap: 10,
  },
  content: {
    padding: 18,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: { maxWidth: 130, flex: 1 },
});
