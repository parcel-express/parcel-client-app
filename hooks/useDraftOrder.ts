import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OrderFormData {
  [key: string]: unknown;
}

const DRAFT_KEY = 'parcel_order_draft';

export const useDraftOrder = () => {
  const saveDraft = async (formData: Partial<OrderFormData>) => {
    await AsyncStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        ...formData,
        savedAt: new Date().toISOString(),
      })
    );
  };

  const loadDraft = async (): Promise<Partial<OrderFormData> | null> => {
    const raw = await AsyncStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    // Expire drafts older than 24 hours
    const savedAt = new Date(draft.savedAt).getTime();
    if (Date.now() - savedAt > 24 * 60 * 60 * 1000) {
      await clearDraft();
      return null;
    }
    return draft;
  };

  const clearDraft = async () => {
    await AsyncStorage.removeItem(DRAFT_KEY);
  };

  return { saveDraft, loadDraft, clearDraft };
};
