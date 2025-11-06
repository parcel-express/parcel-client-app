import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import ContentView from '@/components/ContentView';
import Header from '@/components/Header';
import FaceIdIcon from '@/components/icons/FaceIdIcon';
import { ThemedView } from '@/components/ThemedView';
import CustomSwitch from '@/components/ui/Switch';
import TabButton from '@/components/ui/TabButton';

export default function EasyAuthScreen() {
  const [value, setValue] = React.useState(false);
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Header title={t('profile.easyAuth.title')} hasGoBack />
      <ContentView style={styles.content}>
        <TabButton
          tab={{
            titleKey: 'profile.easyAuth.faceId',
            iconName: FaceIdIcon,
          }}
          rightAccessory={<CustomSwitch value={value} onValueChange={setValue} />}
          hasShadow
        />
      </ContentView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: { padding: 18, gap: 10 },
});
