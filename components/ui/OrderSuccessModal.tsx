import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import Button from './Button';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const OrderSuccessModal = ({ visible, onClose }: Props) => {
  const { t } = useTranslation();
  const onButtonPress = (action: 'home' | 'orders') => {
    if (action === 'home') {
      router.push('/(tabs)');
    } else {
      router.push('/(tabs)/orders');
    }
    onClose();
  };
  return (
    <Modal
      visible={visible}
      animationType='fade'
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image source={require('../../assets/images/checkCircle.png')} style={styles.image} />
          <View>
            <Text style={[Typography.textMdSemiBold, styles.text]}>
              {t('new-order.successTitle')}
            </Text>
            <Text style={[Typography.textXsMedium, styles.text]}>
              {t('new-order.successMessage')}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Button onPress={() => onButtonPress('home')} size={'md'} variant={'dark'}>
            {t('new-order.homePage')}
          </Button>
          <Button onPress={() => onButtonPress('orders')} size={'md'} variant={'secondary'}>
            {t('new-order.orderPage')}
          </Button>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default OrderSuccessModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    paddingBottom: 84,
  },
  content: {
    gap: 44,
    maxWidth: 280,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 84,
    height: 84,
    alignSelf: 'center',
  },
  text: {
    color: Colors.text.white,
    textAlign: 'center',
  },
  actions: {
    gap: 8,
    width: '100%',
  },
});
