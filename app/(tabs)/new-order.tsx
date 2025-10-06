import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import ContentView from '@/components/ContentView';
import DropDown from '@/components/DropDown';
import Header from '@/components/Header';
import FileIcon from '@/components/icons/FileIcon';
import PrinterIcon from '@/components/icons/PrinterIcon';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import CustomSwitch from '@/components/ui/Switch';
import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

export default function NewOrderScreen() {
  const [isActive, setIsActive] = React.useState([true, false]);
  const [index, setIndex] = React.useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation();

  const handlePress = () => {
    setIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
  };
  const data = [
    { icon: FileIcon, label: t('new-order.fileLabel'), price: t('new-order.price') },
    {
      icon: PrinterIcon,
      label: t('new-order.imageLabel'),
      price: t('new-order.price'),
    },
  ];
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <Header title={t('new-order.title')} closeButton />
      <ContentView style={[styles.content, { paddingBottom: tabBarHeight + 20 }]}>
        {index === 0 ? (
          <>
            <View style={styles.buttonsContainer}>
              <DropDown label={t('new-order.senderLabel')} type={'sender'} />
              <View style={styles.divider} />
              <DropDown label={t('new-order.receiverLabel')} type={'receiver'} />
            </View>

            <Button size='md' variant={'primary'} style={styles.submitButton} onPress={handlePress}>
              {t('common.continue')}
            </Button>
          </>
        ) : (
          <View style={styles.switchPage}>
            {data.map((item, index) => (
              <View style={styles.switchContainer} key={item.label}>
                <View style={styles.switchLabelContainer}>
                  <item.icon stroke={Colors.icon.black} strokeWidth={2} />
                  <View style={styles.gap}>
                    <Text style={[Typography.textXsBold, { color: Colors.text.black }]}>
                      {item.label}
                    </Text>
                    <Text style={[Typography.textXsMedium, { color: Colors.text.black }]}>
                      {item.price}
                    </Text>
                  </View>
                </View>
                <CustomSwitch
                  value={isActive[index] || false}
                  onValueChange={value => {
                    const newState = [...isActive];
                    newState[index] = value;
                    setIsActive(newState);
                  }}
                />
              </View>
            ))}
          </View>
        )}
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
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 12,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xs,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border.primary,
  },
  submitButton: {
    borderRadius: 14,
  },
  switchPage: {
    flexDirection: 'column',
    gap: 8,
  },
  switchContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gap: {
    flexDirection: 'column',
    gap: 4,
  },
});
