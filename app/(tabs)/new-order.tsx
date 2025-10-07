import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import Address from '@/components/new-order/Address';
import OrderDetails from '@/components/new-order/OrderDetails';
import Review from '@/components/new-order/Review';
import Services from '@/components/new-order/Services';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import OrderSuccessModal from '@/components/ui/OrderSuccessModal';
import { Colors } from '@/constants/Colors';
export type FormValues = {
  senderAddress: string;
  senderName: string;
  senderSurname: string;
  senderCompany: string;
  senderCity: string;
  senderPhoneNumber: string;
  receiverAddress: string;
  receiverName: string;
  receiverSurname: string;
  receiverCompany: string;
  receiverCity: string;
  receiverPhoneNumber: string;
  giveBackDocs: boolean;
  image: boolean;
  weight: string;
  quantity: string;
  orderNumber: string;
  comment: string;
  startDate: string;
  endDate: string;
  paymentType: string;
  paymentSide: string;
};
export default function NewOrderScreen() {
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation();
  const formik = useFormik<FormValues>({
    initialValues: {
      senderAddress: '',
      senderName: '',
      senderSurname: '',
      senderCompany: '',
      senderCity: '',
      senderPhoneNumber: '',
      receiverAddress: '',
      receiverName: '',
      receiverSurname: '',
      receiverCompany: '',
      receiverCity: '',
      receiverPhoneNumber: '',
      giveBackDocs: false,
      image: false,
      weight: '',
      quantity: '',
      orderNumber: '#',
      comment: '',
      startDate: '',
      endDate: '',
      paymentType: '',
      paymentSide: '',
    },
    onSubmit: () => {
      setModalVisible(true);
      setIndex(0);
    },
  });

  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = React.useRef<FlatList | null>(null);
  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: index * screenWidth,
      animated: true,
    });
  }, [index, screenWidth]);

  const steps = React.useMemo(
    () => [
      <Address formik={formik} key='address' />,
      <OrderDetails formik={formik} key='orderDetails' />,
      <Services formik={formik} key='services' />,
      <Review formik={formik} key='review' />,
    ],
    [formik]
  );
  const handlePress = React.useCallback(() => {
    if (index < steps.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      formik.submitForm();
    }
  }, [index, steps.length, formik]);

  const renderItem = React.useCallback(
    ({ item }: { item: React.ReactElement }) => (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { width: screenWidth }]}
      >
        <View>{item}</View>
        <Button size='md' variant={'primary'} style={styles.submitButton} onPress={handlePress}>
          {index === steps.length - 1 ? t('new-order.reviewLabel') : t('common.continue')}
        </Button>
      </ScrollView>
    ),
    [screenWidth, handlePress, index, steps.length, t]
  );
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header
        title={index === steps.length - 1 ? t('new-order.reviewTitle') : t('new-order.title')}
        closeButton
      />
      <OrderSuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <ContentView style={{ paddingBottom: tabBarHeight }}>
        <FlatList
          ref={flatListRef}
          data={steps}
          // wrap each step so it takes exactly one screen
          renderItem={renderItem}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          getItemLayout={(_, i) => ({
            length: screenWidth,
            offset: screenWidth * i,
            index: i,
          })}
          initialScrollIndex={index}
          extraData={index}
        />
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    justifyContent: 'space-between',
    gap: 48,
    flexGrow: 1,
  },

  submitButton: {
    borderRadius: 14,
  },
});
