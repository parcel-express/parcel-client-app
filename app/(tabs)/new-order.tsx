import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import * as yup from 'yup';

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
import { Typography } from '@/constants/Typography';

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

// Define the type for step fields
type StepFields = (keyof FormValues)[][];

export default function NewOrderScreen() {
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const paddingBottom = useBottomTabBarHeight();
  const { t } = useTranslation();
  const validationSchema = React.useMemo(
    () =>
      yup.object().shape({
        senderAddress: yup.string().required(t('new-order.validation.senderAddress')),
        senderName: yup.string().required(t('new-order.validation.senderName')),
        senderSurname: yup.string().required(t('new-order.validation.senderSurname')),
        senderCompany: yup.string(),
        senderCity: yup.string().required(t('new-order.validation.senderCity')),
        senderPhoneNumber: yup.string().required(t('new-order.validation.senderPhoneNumber')),
        receiverAddress: yup.string().required(t('new-order.validation.receiverAddress')),
        receiverName: yup.string().required(t('new-order.validation.receiverName')),
        receiverSurname: yup.string().required(t('new-order.validation.receiverSurname')),
        receiverCompany: yup.string(),
        receiverCity: yup.string().required(t('new-order.validation.receiverCity')),
        receiverPhoneNumber: yup.string().required(t('new-order.validation.receiverPhoneNumber')),
        giveBackDocs: yup.boolean(),
        image: yup.boolean(),
        weight: yup
          .number()
          .typeError(t('new-order.validation.weightType'))
          .positive(t('new-order.validation.weightPositive'))
          .required(t('new-order.validation.weightRequired')),
        quantity: yup
          .number()
          .typeError(t('new-order.validation.quantityType'))
          .positive(t('new-order.validation.quantityPositive'))
          .required(t('new-order.validation.quantityRequired')),
        orderNumber: yup.string().required(t('new-order.validation.orderNumber')),
        comment: yup.string(),
        startDate: yup.string().required(t('new-order.validation.startDate')),
        endDate: yup.string().required(t('new-order.validation.endDate')),
        paymentType: yup.string().required(t('new-order.validation.paymentType')),
        paymentSide: yup.string().required(t('new-order.validation.paymentSide')),
      }),
    [t]
  );
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
    validationSchema,
    onSubmit: () => {
      setModalVisible(true);
      setTimeout(() => {
        setIndex(0);
        setShowError(false);
        formik.resetForm();
      }, 200);
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

  // Define which fields belong to each step with proper typing
  const stepFields: StepFields = React.useMemo(
    () => [
      [
        'senderAddress',
        'senderName',
        'senderSurname',
        'senderCompany',
        'senderCity',
        'senderPhoneNumber',
        'receiverAddress',
        'receiverName',
        'receiverSurname',
        'receiverCompany',
        'receiverCity',
        'receiverPhoneNumber',
      ],
      ['weight', 'quantity', 'orderNumber', 'comment', 'startDate', 'endDate'],
      ['giveBackDocs', 'image'],
      ['paymentType', 'paymentSide'],
    ],
    []
  );

  const getErrorMessage = React.useCallback(() => {
    if (!showError) return null;

    const errors = formik.errors;
    const currentStepFields = stepFields[index];

    // Guard against undefined
    if (!currentStepFields) return null;

    // Find the first error in the current step
    for (const field of currentStepFields) {
      if (errors[field]) {
        return String(errors[field]);
      }
    }
    return null;
  }, [showError, formik.errors, stepFields, index]);

  const handleNextStep = React.useCallback(async () => {
    const currentStepFields = stepFields[index];

    // Guard against undefined
    if (!currentStepFields) return;

    // Touch all fields in the current step to show errors
    const touchedFields = currentStepFields.reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<keyof FormValues, boolean>
    );

    formik.setTouched({ ...formik.touched, ...touchedFields });

    // Validate only current step fields
    const errors = await formik.validateForm();
    const stepHasErrors = currentStepFields.some(field => errors[field]);

    if (!stepHasErrors) {
      setShowError(false);
      if (index < steps.length - 1) {
        setIndex(prevIndex => prevIndex + 1);
      } else {
        formik.handleSubmit();
      }
    } else {
      setShowError(true);
    }
  }, [stepFields, index, formik, steps.length]);

  const renderItem = React.useCallback(
    ({ item }: { item: React.ReactElement }) => (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? paddingBottom + 56 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { width: screenWidth }]}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          <View>
            {item}
            {getErrorMessage() && (
              <Text style={[Typography.textSmRegular, styles.errorText]}>{getErrorMessage()}</Text>
            )}
          </View>
          <Button size='md' variant='primary' style={styles.submitButton} onPress={handleNextStep}>
            {index === steps.length - 1 ? t('new-order.reviewLabel') : t('common.continue')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    ),
    [paddingBottom, screenWidth, getErrorMessage, handleNextStep, index, steps.length, t]
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

      <ContentView style={Platform.OS === 'ios' && { paddingBottom }}>
        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={renderItem}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
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
  errorText: {
    color: Colors.text.error.primary,
    marginTop: 8,
  },
});
