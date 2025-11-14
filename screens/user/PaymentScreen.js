// PaymentScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const BLUE = '#2563EB';
const { height } = Dimensions.get('window');

export default function PaymentScreen({ navigation }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const [showBalance, setShowBalance] = useState(true);
  const [pin, setPin] = useState('');

  // shared animation values (reused since only one modal shows at a time)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(200)).current;

  const balance = 2500.0;

  // helpers
  const openModal = (setter) => {
    // reset animation start
    translateY.setValue(200);
    fadeAnim.setValue(0);
    setter(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = (setter) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 200,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setter(false));
  };

  // PIN handling
  const handlePinPress = (num) => {
    if (num === 'delete') {
      setPin((p) => p.slice(0, -1));
    } else if (num !== 'blank') {
      setPin((p) => (p.length < 4 ? p + num : p));
    }
  };

  const resetPin = () => setPin('');

  useEffect(() => {
    if (showPinModal) resetPin();
  }, [showPinModal]);

  // Process payment when PIN confirm is clicked - ALWAYS SUCCESS FOR NOW
  const handlePinConfirm = () => {
    closeModal(setShowPinModal);
    
    // Simulate payment processing - ALWAYS SUCCESS
    setTimeout(() => {
      openModal(setShowSuccessModal);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation && navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={22} color={BLUE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Payment Method</Text>
      </View>

      {/* Profile box */}
      <View style={styles.profileBox}>
        <View style={styles.profileCircle} />
        <View>
          <Text style={styles.profileName}>LTE-WIFI_Airtel2.4G_8002</Text>
          <Text style={styles.profileSub}>4634 Uromi · 200M Away</Text>
        </View>
      </View>

      {/* Selection: Wallet / Card (flush, no gap) */}
      <View style={styles.selectionRow}>
        <TouchableOpacity style={[styles.optionButton, styles.optionLeftActive]}>
          <Text style={[styles.optionText, styles.optionActiveText]}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionButton, styles.optionRight]}>
          <Text style={styles.optionText}>Card</Text>
        </TouchableOpacity>
      </View>

      {/* Balance card (blue, white text) */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeaderRow}>
          <View style={styles.balanceLabelRow}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <TouchableOpacity
              onPress={() => setShowBalance((s) => !s)}
              style={styles.eyeBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name={showBalance ? 'eye' : 'eye-off'} size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceRow}>
          <Text style={styles.balanceSymbol}>₦</Text>
          <Text style={styles.balanceValue}>
            {showBalance ? balance.toFixed(2) : '••••'}
          </Text>
          <Text style={styles.balanceCurrency}>NGN</Text>
        </View>
      </View>

      {/* sticky bottom proceed */}
      <View style={styles.bottomSticky}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => openModal(setShowConfirmModal)}
        >
          <Feather name="shield" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* -------------------- CONFIRM MODAL -------------------- */}
      <Modal transparent visible={showConfirmModal} animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
            <View style={styles.sheetTop}>
              <TouchableOpacity onPress={() => closeModal(setShowConfirmModal)}>
                <Feather name="x" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetCenter}>
              <View style={[styles.circleIcon, { borderColor: BLUE, backgroundColor: '#ebf5ff' }]}>
                <Text style={[styles.circleIconTxt, { color: BLUE }]}>?</Text>
              </View>

              <Text style={styles.sheetTitle}>Are you sure you want to proceed?</Text>
            </View>

            <View style={styles.sheetButtonsRow}>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnOutline]}
                onPress={() => closeModal(setShowConfirmModal)}
              >
                <Text style={styles.sheetBtnOutlineText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                onPress={() => {
                  closeModal(setShowConfirmModal);
                  openModal(setShowPinModal);
                }}
              >
                <Text style={styles.sheetBtnPrimaryText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* -------------------- PIN MODAL -------------------- */}
      <Modal transparent visible={showPinModal} animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
            <View style={styles.sheetTop}>
              <TouchableOpacity onPress={() => closeModal(setShowPinModal)}>
                <Feather name="x" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetCenter}>
              <Text style={styles.sheetTitle}>Enter your PIN</Text>

              <View style={styles.pinRow}>
                {[0, 1, 2, 3].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.pinDot,
                      pin.length > i ? { backgroundColor: BLUE } : null,
                    ]}
                  />
                ))}
              </View>

              {/* keypad with white circular keys */}
              <View style={styles.keypad}>
                {['1','2','3','4','5','6','7','8','9','blank','0','delete'].map((k, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.keyCircle,
                      k === 'blank' && { backgroundColor: 'transparent', borderWidth: 0 },
                    ]}
                    onPress={() => handlePinPress(k)}
                    activeOpacity={0.7}
                  >
                    {k === 'delete' ? (
                      <Feather name="delete" size={20} color={BLUE} />
                    ) : (
                      <Text style={styles.keyText}>{k === 'blank' ? '' : k}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.sheetButtonsRow}>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnOutline]}
                onPress={() => closeModal(setShowPinModal)}
              >
                <Text style={styles.sheetBtnOutlineText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnPrimary, pin.length !== 4 && { opacity: 0.5 }]}
                onPress={handlePinConfirm}
                disabled={pin.length !== 4}
              >
                <Text style={styles.sheetBtnPrimaryText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* -------------------- SUCCESS MODAL -------------------- */}
      <Modal transparent visible={showSuccessModal} animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
            <View style={styles.sheetTop}>
              <TouchableOpacity onPress={() => closeModal(setShowSuccessModal)}>
                <Feather name="x" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetCenter}>
              <View style={[styles.circleIcon, { backgroundColor: '#dcfce7', borderColor: '#16a34a' }]}>
                <Feather name="check" size={28} color="#16a34a" />
              </View>
              <Text style={styles.sheetTitle}>Payment Successful!</Text>
            </View>

            <View style={styles.sheetButtonsRow}>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: BLUE }]}
                onPress={() => closeModal(setShowSuccessModal)}
              >
                <Text style={[styles.sheetBtnOutlineText, { color: BLUE }]}>Transaction History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                onPress={() => {
                  closeModal(setShowSuccessModal);
                  // Navigate to home or next screen
                  if (navigation) navigation.navigate('Home');
                }}
              >
                <Text style={styles.sheetBtnPrimaryText}>Go Home</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* -------------------- FAILED MODAL -------------------- */}
      <Modal transparent visible={showFailedModal} animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
            <View style={styles.sheetTop}>
              <TouchableOpacity onPress={() => closeModal(setShowFailedModal)}>
                <Feather name="x" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetCenter}>
              <View style={[styles.circleIcon, { backgroundColor: '#fee2e2', borderColor: '#ef4444' }]}>
                <Feather name="x" size={28} color="#ef4444" />
              </View>
              <Text style={styles.sheetTitle}>Payment Failed</Text>
              <Text style={styles.sheetSubtitle}>Please check your balance and try again</Text>
            </View>

            <View style={styles.sheetButtonsRow}>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnOutline, { borderColor: BLUE }]}
                onPress={() => {
                  closeModal(setShowFailedModal);
                  // Reopen PIN to retry
                  openModal(setShowPinModal);
                }}
              >
                <Text style={[styles.sheetBtnOutlineText, { color: BLUE }]}>Retry</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                onPress={() => {
                  closeModal(setShowFailedModal);
                  // Navigate to home
                  if (navigation) navigation.navigate('Home');
                }}
              >
                <Text style={styles.sheetBtnPrimaryText}>Go Home</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop: 56 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backBtn: { marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },

  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
  },
  profileCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E7EB', marginRight: 12 },
  profileName: { fontWeight: '600', color: '#111827' },
  profileSub: { color: '#6B7280', fontSize: 13 },

  selectionRow: { flexDirection: 'row', marginBottom: 18, borderRadius: 10, overflow: 'hidden' },
  optionButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E6E9EE' },
  optionLeftActive: { backgroundColor: BLUE, borderColor: BLUE },
  optionRight: { backgroundColor: '#fff' },
  optionText: { color: '#6B7280', fontWeight: '600' },
  optionActiveText: { color: '#fff' },

  balanceCard: { backgroundColor: BLUE, padding: 24, borderRadius: 14, marginBottom: 28 },
  balanceHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabelRow: { flexDirection: 'row', alignItems: 'center' },
  balanceLabel: { color: '#fff', fontSize: 14, fontWeight: '500' },
  eyeBtn: { marginLeft: 8 },

  balanceRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 },
  balanceSymbol: { color: '#fff', fontSize: 20, marginRight: 2, marginBottom: 2 },
  balanceValue: { color: '#fff', fontSize: 30, fontWeight: '700' },
  balanceCurrency: { color: '#E0E7FF', fontSize: 12, marginLeft: 6, marginBottom: 6 },

  bottomSticky: { flex: 1, justifyContent: 'flex-end' },
  proceedBtn: { backgroundColor: BLUE, paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  proceedText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.36)' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 26 },
  sheetTop: { alignItems: 'flex-end' },
  sheetCenter: { alignItems: 'center', marginVertical: 8 },
  circleIcon: { width: 64, height: 64, borderRadius: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 10 },
  circleIconTxt: { fontSize: 28, fontWeight: '700' },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginTop: 6 },
  sheetSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4, textAlign: 'center' },

  sheetButtonsRow: { flexDirection: 'row', marginTop: 18, justifyContent: 'space-between' },
  sheetBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 6 },
  sheetBtnPrimary: { backgroundColor: BLUE },
  sheetBtnPrimaryText: { color: '#fff', fontWeight: '700' },
  sheetBtnOutline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E6EEF9' },
  sheetBtnOutlineText: { color: '#111827', fontWeight: '700' },

  // PIN
  pinRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 12 },
  pinDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: BLUE, marginHorizontal: 8 },

  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  keyCircle: {
    width: '28%',
    aspectRatio: 1,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E6EEF9',
    elevation: 1,
  },
  keyText: { color: BLUE, fontSize: 18, fontWeight: '700' },
});