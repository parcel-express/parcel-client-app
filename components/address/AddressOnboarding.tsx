import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

type OnboardingStep = 'welcome' | 'type' | 'form' | 'confirm';

type Props = {
  onComplete: () => void;
  onOpenForm?: () => void;
};

export const AddressOnboarding = ({ onComplete, onOpenForm }: Props) => {
  const { t } = useTranslation();

  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [type, setType] = useState<'home' | 'work' | 'other'>('home');

  const next = () => {
    if (step === 'welcome') setStep('type');
    else if (step === 'type') setStep('form');
    else if (step === 'form') setStep('confirm');
    else if (step === 'confirm') onComplete();
  };

  const renderDots = () => {
    const steps = ['welcome', 'type', 'form', 'confirm'];

    return (
      <View style={styles.dots}>
        {steps.map(s => (
          <View key={s} style={[styles.dot, step === s && styles.activeDot]} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderDots()}

      {step === 'welcome' && (
        <>
          <Text style={styles.title}>{t('addressOnboarding.welcomeTitle')}</Text>
          <Text style={styles.desc}>{t('addressOnboarding.welcomeDesc')}</Text>
        </>
      )}

      {step === 'type' && (
        <>
          <Text style={styles.title}>{t('addressOnboarding.pickType')}</Text>

          <View style={styles.types}>
            {(['home', 'work', 'other'] as const).map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setType(item)}
                style={[styles.typeButton, type === item && styles.typeActive]}
              >
                <Text>{t(`addressOnboarding.${item}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {step === 'form' && (
        <>
          <Text style={styles.desc}>{t('addressOnboarding.tips')}</Text>

          <Button
            variant='secondary'
            size='lg'
            style={styles.formButton}
            onPress={onOpenForm || (() => {})}
          >
            {t('addressOnboarding.openForm')}
          </Button>
        </>
      )}

      {step === 'confirm' && (
        <>
          <Text style={styles.title}>{t('addressOnboarding.done')}</Text>
        </>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity onPress={onComplete}>
          <Text>{t('addressOnboarding.skip')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressOnboarding;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
  },

  desc: {
    marginTop: 8,
    color: Colors.text.secondary,
  },

  formButton: {
    marginTop: 16,
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.background.infoAmanat,
  },

  activeDot: {
    backgroundColor: Colors.brand.primary,
  },

  types: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },

  typeButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.background.secondarySubtle,
  },

  typeActive: {
    backgroundColor: Colors.brand.primary,
  },

  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
