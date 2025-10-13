import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
import InfoCard from '@/components/ui/InfoCard';
import InfoModal from '@/components/ui/InfoModal';
import NotificationsModal from '@/components/ui/NotificationsModal';
import Select from '@/components/ui/Select';
import Tag from '@/components/ui/Tag';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const SupportPage = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => {
      // TO DO: Implement search functionality
    },
  });
  const [isInfoModalVisible, setInfoModalIsVisible] = React.useState(false);
  const [isModalVisible, setModalIsVisible] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>('Ongoing');
  const [status, setStatus] = React.useState<Status | 'status'>('status');
  const [subject, setSubject] = React.useState<string>('subject');
  // const [search, setSearch] = React.useState('');
  const [date, setDate] = React.useState<{ start?: string; end?: string }>({});
  const paddingBottom = useBottomTabBarHeight() + 18;
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
  const openInfoModal = () => setInfoModalIsVisible(true);
  const closeInfoModal = () => (setInfoModalIsVisible(false), null);
  const Status = () => (
    <View style={[styles.row, styles.spaceBetween]}>
      <Text style={[Typography.textSmRegular, { color: Colors.text.primary }]}>
        შეკვეთა: <Text style={[Typography.textSmBold]}>#223394</Text>
      </Text>
      <Tag label={t('status.open')} variant='success' />
    </View>
  );
  const infoData = [
    {
      body: <Status />,
    },
    {
      body: (
        <InfoCard
          variant='row'
          data={[
            { label: 'დაფიქსირების თარიღი:', value: '17/07/2025 12:12' },
            { label: 'სავარაუდო დასრულების თარიღი:', value: '17/07/2025' },
            {
              label: 'დასრულების თარიღი:',
              value: '17/07/2025 12:27',
            },
          ]}
        />
      ),
    },
    {
      body: (
        <InfoCard
          variant='unstyled'
          data={[
            { label: 'თემა', value: 'ჩაბარების თარიღის დაზუსტება' },
            { label: 'მომხმარებლის კომენტარი', value: 'როდის ჩაბარდება ამანათი?' },
            {
              label: 'ონვეის კომენტარი',
              value: 'ადრესატმა დღეს არ უპასუხა კურიერის ზარს, ხელმეორედ ვიზიტი მოხდება ხვალ.',
            },
          ]}
        />
      ),
    },
    {
      body: [
        {
          label: 'სტატუსი',
          value: <Tag label={'pending'} variant='warning' />,
        },
        {
          label: 'მომსახურების დონე',
          value: 'სტანდარტი',
        },
        { label: 'შეკვეთის თარიღი', value: '12/12/2023' },
        { label: 'აღების თარიღი', value: '12/12/2023' },
        { label: 'სავა. ჩაბარების თარიღი', value: '12/12/2023' },
        {
          label: 'დასრულების თარიღი',
          value: '- -',
        },
      ],
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <Header title={t('profile.support.title')} hasGoBack />
      <NotificationsModal visible={isModalVisible} onClose={closeModal} variant='support' />
      <InfoModal data={infoData} onClose={closeInfoModal} visible={isInfoModalVisible} />
      <ContentView>
        <FlatList
          data={data}
          ListHeaderComponent={
            <>
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
            </>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={openInfoModal}>
              <Card data={item} variant='support' />
            </TouchableOpacity>
          )}
          contentContainerStyle={[styles.body, { paddingBottom }]}
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
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.borderLight,
  },
  body: {
    paddingHorizontal: 18,
    gap: 10,
  },
  content: {
    paddingVertical: 18,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  buttonContainer: { maxWidth: 130, flex: 1 },
});
