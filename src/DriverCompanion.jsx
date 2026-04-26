import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Clock, MapPin, DollarSign, TrendingUp, Calendar, Globe, Coffee, Zap, ChevronRight, Activity } from 'lucide-react';

// ============ TRANSLATIONS ============
const translations = {
  en: {
    appName: 'Driver Companion',
    tagline: 'Your trusted ride partner',
    today: 'Today',
    week: 'This Week',
    month: 'This Month',
    startShift: 'Start Shift',
    endShift: 'End Shift',
    activeShift: 'Active Shift',
    enterEarning: 'Enter your earnings',
    earningPlaceholder: 'How much did you make this shift?',
    save: 'Save',
    cancel: 'Cancel',
    cancelShift: 'Cancel Shift',
    duration: 'Duration',
    distance: 'Distance',
    earnings: 'Earnings',
    perHour: 'Per Hour',
    netProfit: 'Net Profit',
    fuelCost: 'Fuel Cost (est.)',
    todayShifts: "Today's Shifts",
    shift: 'Shift',
    bestHours: 'Best Working Hours',
    bestDays: 'Best Days of Week',
    insights: 'Smart Insights',
    weeklyEarnings: 'Weekly Earnings',
    home: 'Home',
    history: 'History',
    insights2: 'Insights',
    settings: 'Settings',
    hours: 'h',
    minutes: 'm',
    km: 'km',
    currency: '$',
    insight1: "Friday is your best day — earnings are 30% higher",
    insight2: 'Evening shifts (6PM–10PM) earn you the most',
    insight3: "You've been working 6 days straight. Consider a rest day.",
    breakReminder: "Time for a break! You've been driving for 4 hours",
    monStart: 'Mon',
    tueStart: 'Tue',
    wedStart: 'Wed',
    thuStart: 'Thu',
    friStart: 'Fri',
    satStart: 'Sat',
    sunStart: 'Sun',
    confirmEnd: 'End shift?',
    confirmEndDesc: 'Enter your earnings to complete this shift',
    online: 'On Duty',
    offline: 'Off Duty',
    quickStats: 'Quick Stats',
    totalToday: 'Total Today',
    activeNow: 'Active Now',
    language: 'Language',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night',
    emptyHistory: 'No shifts yet',
    emptyHistoryDesc: 'Your completed shifts will appear here',
    emptyShifts: 'No shifts today yet',
    emptyShiftsDesc: 'Tap "Start Shift" to begin tracking',
    emptyInsights: 'Not enough data yet',
    emptyInsightsDesc: 'Complete a few shifts to unlock insights',
    gpsOff: 'GPS off — distance not tracked',
    gpsRequired: 'Location permission was denied',
    gpsBlockedTitle: 'Location is required',
    gpsBlockedDesc: 'To track your shift accurately, please turn on Location and grant permission. Then try again.',
    gpsHowToIos: 'iOS: Settings → Privacy → Location Services',
    gpsHowToAndroid: 'Android: Settings → Location → turn on',
    tryAgain: 'Try Again',
    close: 'Close',
  },
  fa: {
    appName: 'همراه راننده',
    tagline: 'شریک مطمئن سفر شما',
    today: 'امروز',
    week: 'این هفته',
    month: 'این ماه',
    startShift: 'شروع شیفت',
    endShift: 'پایان شیفت',
    activeShift: 'شیفت فعال',
    enterEarning: 'درآمد خود را وارد کنید',
    earningPlaceholder: 'این شیفت چقدر درآمد داشتی؟',
    save: 'ذخیره',
    cancel: 'انصراف',
    cancelShift: 'لغو شیفت',
    duration: 'مدت زمان',
    distance: 'مسافت',
    earnings: 'درآمد',
    perHour: 'هر ساعت',
    netProfit: 'سود خالص',
    fuelCost: 'هزینه بنزین (تخمینی)',
    todayShifts: 'شیفت‌های امروز',
    shift: 'شیفت',
    bestHours: 'بهترین ساعات کاری',
    bestDays: 'بهترین روزهای هفته',
    insights: 'بینش‌های هوشمند',
    weeklyEarnings: 'درآمد هفتگی',
    home: 'خانه',
    history: 'تاریخچه',
    insights2: 'بینش‌ها',
    settings: 'تنظیمات',
    hours: 'ساعت',
    minutes: 'دقیقه',
    km: 'کیلومتر',
    currency: '$',
    insight1: 'جمعه بهترین روزته — درآمدت ۳۰٪ بیشتره',
    insight2: 'شیفت‌های عصر (۱۸ تا ۲۲) بیشترین درآمد رو دارن',
    insight3: '۶ روز پشت سر هم کار کردی. یه روز استراحت کن.',
    breakReminder: 'وقت استراحته! ۴ ساعته داری رانندگی میکنی',
    monStart: 'دوشنبه',
    tueStart: 'سه‌شنبه',
    wedStart: 'چهارشنبه',
    thuStart: 'پنج‌شنبه',
    friStart: 'جمعه',
    satStart: 'شنبه',
    sunStart: 'یک‌شنبه',
    confirmEnd: 'پایان شیفت؟',
    confirmEndDesc: 'برای تکمیل شیفت، درآمدت رو وارد کن',
    online: 'در حال کار',
    offline: 'غیر فعال',
    quickStats: 'آمار سریع',
    totalToday: 'مجموع امروز',
    activeNow: 'فعال الان',
    language: 'زبان',
    morning: 'صبح',
    afternoon: 'ظهر',
    evening: 'عصر',
    night: 'شب',
    emptyHistory: 'هنوز شیفتی نداری',
    emptyHistoryDesc: 'شیفت‌های کامل شده‌ت اینجا نمایش داده میشن',
    emptyShifts: 'امروز هنوز شیفتی نداری',
    emptyShiftsDesc: 'برای شروع، روی «شروع شیفت» بزن',
    emptyInsights: 'هنوز داده کافی نداریم',
    emptyInsightsDesc: 'چند تا شیفت ثبت کن تا بینش‌ها فعال بشن',
    gpsOff: 'GPS خاموش — مسافت ثبت نمیشه',
    gpsRequired: 'دسترسی به موقعیت رد شد',
    gpsBlockedTitle: 'نیاز به فعال بودن موقعیت',
    gpsBlockedDesc: 'برای ثبت دقیق شیفت، لطفاً GPS رو روشن کن و اجازه دسترسی بده. بعد دوباره امتحان کن.',
    gpsHowToIos: 'آیفون: تنظیمات → حریم خصوصی → خدمات موقعیت مکانی',
    gpsHowToAndroid: 'اندروید: تنظیمات → موقعیت → روشن کن',
    tryAgain: 'تلاش دوباره',
    close: 'بستن',
  }
};

// ============ LOCAL STORAGE HELPERS ============
const STORAGE_KEYS = {
  lang: 'dc_lang',
  shifts: 'dc_shifts',
  activeShift: 'dc_active_shift', // { startTime, distance, lastLat, lastLng }
};

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
};

// Haversine formula — distance in km between two GPS points
const haversineKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

export default function DriverCompanion() {
  // Load initial state from localStorage. First-time users get sample shifts;
  // returning users get their actual saved data (which may be an empty list).
  const [lang, setLang] = useState(() => loadFromStorage(STORAGE_KEYS.lang, 'en'));
  const [activeTab, setActiveTab] = useState('home');

  const [shifts, setShifts] = useState(() =>
    loadFromStorage(STORAGE_KEYS.shifts, [])
  );

  // Restore an active shift if the user closed the app mid-shift
  const savedActiveShift = loadFromStorage(STORAGE_KEYS.activeShift, null);
  const [isOnShift, setIsOnShift] = useState(savedActiveShift !== null);
  const [shiftStartTime, setShiftStartTime] = useState(savedActiveShift?.startTime ?? null);
  const [elapsedTime, setElapsedTime] = useState(
    savedActiveShift ? Date.now() - savedActiveShift.startTime : 0
  );
  // GPS-tracked distance (km) for the active shift
  const [shiftDistance, setShiftDistance] = useState(savedActiveShift?.distance ?? 0);
  const [gpsAvailable, setGpsAvailable] = useState(true); // becomes false if user denies permission
  const lastPositionRef = useRef(
    savedActiveShift?.lastLat
      ? { lat: savedActiveShift.lastLat, lng: savedActiveShift.lastLng }
      : null
  );
  const watchIdRef = useRef(null);

  const [showEarningModal, setShowEarningModal] = useState(false);
  const [showGpsBlockedModal, setShowGpsBlockedModal] = useState(false);
  const [earningInput, setEarningInput] = useState('');
  const earningInputRef = useRef(null);

  const t = translations[lang];
  const isRTL = lang === 'fa';

  // Persist language whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.lang, lang);
  }, [lang]);

  // Persist shifts whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.shifts, shifts);
  }, [shifts]);

  // Persist active shift state (or clear it when shift ends)
  useEffect(() => {
    if (isOnShift && shiftStartTime) {
      saveToStorage(STORAGE_KEYS.activeShift, {
        startTime: shiftStartTime,
        distance: shiftDistance,
        lastLat: lastPositionRef.current?.lat,
        lastLng: lastPositionRef.current?.lng,
      });
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.activeShift);
      } catch {}
    }
  }, [isOnShift, shiftStartTime, shiftDistance]);

  // Focus input after modal animation completes (autoFocus doesn't work
  // reliably with animated modals on mobile — keyboard won't pop up)
  useEffect(() => {
    if (showEarningModal) {
      const timer = setTimeout(() => {
        earningInputRef.current?.focus();
        // Scroll input into view in case keyboard covers it
        earningInputRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 350); // Wait for slide-up animation (0.4s) to mostly finish
      return () => clearTimeout(timer);
    }
  }, [showEarningModal]);

  // Update elapsed time every second when on shift
  useEffect(() => {
    if (!isOnShift) return;
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - shiftStartTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOnShift, shiftStartTime]);

  // GPS tracking — accumulate distance while shift is active
  useEffect(() => {
    if (!isOnShift) return;
    if (!('geolocation' in navigator)) {
      setGpsAvailable(false);
      return;
    }

    const handlePosition = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      // Ignore very inaccurate readings (>100m) to avoid GPS jitter inflating distance
      if (accuracy > 100) return;

      if (lastPositionRef.current) {
        const km = haversineKm(
          lastPositionRef.current.lat,
          lastPositionRef.current.lng,
          latitude,
          longitude
        );
        // Ignore tiny jitter movements (<10 meters) when stationary
        if (km > 0.01) {
          setShiftDistance((prev) => prev + km);
          lastPositionRef.current = { lat: latitude, lng: longitude };
        }
      } else {
        // First reading — just store position, no distance yet
        lastPositionRef.current = { lat: latitude, lng: longitude };
      }
    };

    const handleError = (err) => {
      console.warn('GPS error:', err.message);
      if (err.code === err.PERMISSION_DENIED) {
        setGpsAvailable(false);
      }
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 5000,    // accept positions up to 5s old
        timeout: 30000,      // wait up to 30s for a reading
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isOnShift]);

  const handleStartShift = () => {
    // Refuse to start the shift unless we can get a GPS reading.
    // The browser only triggers the OS permission/Location-Services prompt
    // when we actually try to read a position, so we use getCurrentPosition
    // as both a check and a way to surface the OS prompt.
    if (!('geolocation' in navigator)) {
      setShowGpsBlockedModal(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // GPS is on AND user granted permission — start the shift
        const { latitude, longitude } = position.coords;
        lastPositionRef.current = { lat: latitude, lng: longitude };
        setIsOnShift(true);
        setShiftStartTime(Date.now());
        setElapsedTime(0);
        setShiftDistance(0);
        setGpsAvailable(true);
      },
      (err) => {
        // Either permission denied OR location services off — block the shift
        console.warn('Cannot start shift, GPS error:', err.message);
        setShowGpsBlockedModal(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // force a fresh reading so we know GPS truly works
      }
    );
  };

  const handleEndShift = () => {
    setShowEarningModal(true);
  };

  const handleSaveShift = () => {
    if (!earningInput) return;
    const duration = elapsedTime / (1000 * 60 * 60);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newShift = {
      id: Date.now(),
      start: new Date(shiftStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      end: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: parseFloat(duration.toFixed(2)),
      distance: parseFloat(shiftDistance.toFixed(1)), // real GPS-tracked distance
      gpsTracked: gpsAvailable && shiftDistance > 0,
      earnings: parseFloat(earningInput),
      date: today,
      day: 'today',
      timestamp: Date.now(),
    };
    setShifts([...shifts, newShift]);
    setIsOnShift(false);
    setShiftStartTime(null);
    setElapsedTime(0);
    setShiftDistance(0);
    lastPositionRef.current = null;
    setEarningInput('');
    setShowEarningModal(false);
  };

  const handleCancelShift = () => {
    // Discard the shift entirely — no record saved
    setIsOnShift(false);
    setShiftStartTime(null);
    setElapsedTime(0);
    setShiftDistance(0);
    lastPositionRef.current = null;
    setEarningInput('');
    setShowEarningModal(false);
  };

  const formatElapsed = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Format decimal hours into H:MM (e.g., 9.0 → "9:00", 4.5 → "4:30")
  const formatHours = (decimalHours) => {
    const h = Math.floor(decimalHours);
    const m = Math.round((decimalHours - h) * 60);
    return `${h}:${String(m).padStart(2, '0')}`;
  };

  // Only count today's shifts for the home screen totals
  const todayDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayShifts = shifts.filter((s) => s.date === todayDateStr || (!s.date && s.day === 'today'));

  const todayTotal = todayShifts.reduce((sum, s) => sum + s.earnings, 0);
  // Include the active shift's elapsed hours so totals update live
  const completedHours = todayShifts.reduce((sum, s) => sum + s.duration, 0);
  const liveHours = isOnShift ? elapsedTime / (1000 * 60 * 60) : 0;
  const todayHours = completedHours + liveHours;
  // Include the active shift's GPS distance so it's visible while driving
  const completedDistance = todayShifts.reduce((sum, s) => sum + s.distance, 0);
  const todayDistance = completedDistance + (isOnShift ? shiftDistance : 0);
  const fuelCost = Math.round(todayDistance * 0.35);
  const netProfit = todayTotal - fuelCost;
  const perHour = todayHours > 0 ? Math.round(todayTotal / todayHours) : 0;

  // Weekly data for chart
  const weeklyData = [
    { day: t.monStart, earnings: 245 },
    { day: t.tueStart, earnings: 198 },
    { day: t.wedStart, earnings: 312 },
    { day: t.thuStart, earnings: 267 },
    { day: t.friStart, earnings: 423 },
    { day: t.satStart, earnings: 389 },
    { day: t.sunStart, earnings: todayTotal },
  ];
  const maxWeekly = Math.max(...weeklyData.map(d => d.earnings));

  // Best hours data
  const hoursData = [
    { period: t.morning, value: 28, color: '#FFB87C' },
    { period: t.afternoon, value: 18, color: '#FFD18C' },
    { period: t.evening, value: 42, color: '#FF8B5C' },
    { period: t.night, value: 35, color: '#E66A3D' },
  ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ fontFamily: isRTL ? "'Vazirmatn', system-ui, sans-serif" : "'Plus Jakarta Sans', system-ui, sans-serif" }}
      className="min-h-screen bg-stone-50 text-stone-900"
    >
      {/* Embedded fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700;800&family=Fraunces:wght@400;500;600;700&display=swap');

        .display-font-en { font-family: 'Fraunces', serif; font-feature-settings: 'ss01'; }
        .display-font-fa { font-family: 'Vazirmatn', sans-serif; }
        .tabular { font-variant-numeric: tabular-nums; }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up { animation: slide-up 0.4s ease-out; }

        .gradient-shift {
          background: linear-gradient(135deg, #FF8B5C 0%, #FFB87C 100%);
        }
        .gradient-card {
          background: linear-gradient(145deg, #FFF8F3 0%, #FFEEE0 100%);
        }
      `}</style>

      {/* ============ HEADER ============ */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between bg-white border-b border-stone-200">
        <div>
          <h1 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-2xl font-bold tracking-tight`}>
            {t.appName}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">{t.tagline}</p>
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-sm font-medium"
        >
          <Globe size={14} />
          {lang === 'en' ? 'فارسی' : 'English'}
        </button>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main className="px-6 py-6 pb-32 max-w-md mx-auto">

        {activeTab === 'home' && (
          <div className="slide-up">
            {/* Status Card */}
            <div className={`mb-6 rounded-3xl p-6 ${isOnShift ? 'gradient-shift text-white' : 'bg-white border border-stone-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOnShift ? 'bg-white pulse-soft' : 'bg-stone-300'}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isOnShift ? 'text-white/90' : 'text-stone-500'}`}>
                    {isOnShift ? t.online : t.offline}
                  </span>
                </div>
                {isOnShift && (
                  <Activity size={16} className="text-white/90" />
                )}
              </div>

              {isOnShift ? (
                <>
                  <div className="tabular text-5xl font-bold mb-2">
                    {formatElapsed(elapsedTime)}
                  </div>
                  <p className="text-sm text-white/80 mb-4">{t.activeShift}</p>

                  {/* Live distance from GPS */}
                  <div className="flex items-center gap-2 mb-6 text-white/90">
                    <MapPin size={14} />
                    {gpsAvailable ? (
                      <span className="tabular text-sm">
                        {shiftDistance.toFixed(1)} {t.km}
                      </span>
                    ) : (
                      <span className="text-xs italic opacity-80">{t.gpsOff}</span>
                    )}
                  </div>

                  <button
                    onClick={handleEndShift}
                    className="w-full py-4 rounded-2xl bg-white text-orange-600 font-semibold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
                  >
                    <Square size={18} fill="currentColor" />
                    {t.endShift}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{t.totalToday}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="tabular text-5xl font-bold">{todayTotal}</span>
                      <span className="text-xl text-stone-400">{t.currency}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleStartShift}
                    className="w-full py-4 rounded-2xl gradient-shift text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    <Play size={18} fill="currentColor" />
                    {t.startShift}
                  </button>
                </>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-500">
                  <Clock size={14} />
                  <span className="text-xs uppercase tracking-wider font-medium">{t.duration}</span>
                </div>
                <div className="tabular text-2xl font-bold">{formatHours(todayHours)}</div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-500">
                  <MapPin size={14} />
                  <span className="text-xs uppercase tracking-wider font-medium">{t.distance}</span>
                </div>
                <div className="tabular text-2xl font-bold">{todayDistance}<span className="text-base text-stone-400 mx-1">{t.km}</span></div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-500">
                  <TrendingUp size={14} />
                  <span className="text-xs uppercase tracking-wider font-medium">{t.perHour}</span>
                </div>
                <div className="tabular text-2xl font-bold">{perHour}<span className="text-base text-stone-400 mx-1">{t.currency}</span></div>
              </div>

              <div className="gradient-card rounded-2xl p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-2 text-orange-700">
                  <DollarSign size={14} />
                  <span className="text-xs uppercase tracking-wider font-medium">{t.netProfit}</span>
                </div>
                <div className="tabular text-2xl font-bold text-orange-900">{netProfit}<span className="text-base text-orange-400 mx-1">{t.currency}</span></div>
              </div>
            </div>

            {/* Today's Shifts */}
            {todayShifts.length > 0 && (
              <div className="mb-6">
                <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-3`}>
                  {t.todayShifts}
                </h2>
                <div className="space-y-2">
                  {todayShifts.map((shift, idx) => (
                    <div key={shift.id} className="bg-white rounded-2xl p-4 border border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-orange-700">{idx + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold tabular">{shift.start} — {shift.end}</div>
                          <div className="text-xs text-stone-500 tabular">{formatHours(shift.duration)} · {shift.distance} {t.km}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="tabular font-bold">{shift.earnings} {t.currency}</div>
                        <div className="text-xs text-stone-400 tabular">{Math.round(shift.earnings / shift.duration)} {t.currency}/{t.hours}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights — only show when we have enough data to make them meaningful.
                With <5 shifts, these would be fabricated, so we hide them. */}
            {shifts.length >= 5 && (
              <div className="mb-6">
                <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-3`}>
                  {t.insights}
                </h2>
                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Zap size={14} className="text-amber-700" />
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{t.insight1}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={14} className="text-emerald-700" />
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{t.insight2}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <Coffee size={14} className="text-rose-700" />
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{t.insight3}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="slide-up">
            {shifts.length < 5 ? (
              <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp size={20} className="text-stone-400" />
                </div>
                <p className="font-semibold text-stone-700 mb-1">{t.emptyInsights}</p>
                <p className="text-sm text-stone-500">{t.emptyInsightsDesc}</p>
              </div>
            ) : (
              <>
                {/* Weekly Chart */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 mb-6">
                  <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-1`}>
                    {t.weeklyEarnings}
                  </h2>
                  <div className="tabular text-3xl font-bold mb-6">
                    {weeklyData.reduce((s, d) => s + d.earnings, 0)}<span className="text-lg text-stone-400 mx-1">{t.currency}</span>
                  </div>
                  <div className="flex items-end justify-between gap-2 h-40">
                    {weeklyData.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex items-end" style={{ height: '120px' }}>
                          <div
                            className="w-full rounded-t-lg transition-all"
                            style={{
                              height: `${(d.earnings / maxWeekly) * 100}%`,
                              background: i === weeklyData.length - 1
                                ? 'linear-gradient(180deg, #FF8B5C 0%, #FFB87C 100%)'
                                : '#FFE4D1'
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-stone-500 font-medium">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Hours */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 mb-6">
                  <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-4`}>
                    {t.bestHours}
                  </h2>
                  <div className="space-y-3">
                    {hoursData.map((h, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-stone-700">{h.period}</span>
                          <span className="tabular text-sm font-bold text-stone-900">{h.value} {t.currency}/{t.hours}</span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${(h.value / 50) * 100}%`, background: h.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="slide-up">
            <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-3`}>
              {t.history}
            </h2>
            {shifts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                  <Calendar size={20} className="text-stone-400" />
                </div>
                <p className="font-semibold text-stone-700 mb-1">{t.emptyHistory}</p>
                <p className="text-sm text-stone-500">{t.emptyHistoryDesc}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(() => {
                  // Group shifts by date (using their createdAt timestamp)
                  const grouped = {};
                  shifts.forEach((s) => {
                    const dateKey = s.date || 'today';
                    if (!grouped[dateKey]) {
                      grouped[dateKey] = { date: dateKey, shifts: 0, earnings: 0, hours: 0 };
                    }
                    grouped[dateKey].shifts += 1;
                    grouped[dateKey].earnings += s.earnings;
                    grouped[dateKey].hours += s.duration;
                  });
                  const days = Object.values(grouped).reverse();
                  return days.map((d, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-stone-200 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{d.date}</div>
                        <div className="text-xs text-stone-500 tabular">{d.shifts} {t.shift} · {formatHours(d.hours)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="tabular font-bold">{d.earnings} {t.currency}</div>
                        <ChevronRight size={16} className={`text-stone-400 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ============ BOTTOM NAV ============ */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-3">
        <div className="max-w-md mx-auto flex justify-around">
          {[
            { id: 'home', icon: Activity, label: t.home },
            { id: 'insights', icon: TrendingUp, label: t.insights2 },
            { id: 'history', icon: Calendar, label: t.history },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                activeTab === tab.id ? 'text-orange-600' : 'text-stone-400'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ============ EARNING MODAL ============ */}
      {showEarningModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowEarningModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl slide-up flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 overflow-y-auto flex-1">
              <h3 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-xl font-bold mb-1`}>
                {t.confirmEnd}
              </h3>
              <p className="text-sm text-stone-500 mb-6">{t.confirmEndDesc}</p>

              {/* Input first — always visible above keyboard */}
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2 font-medium">
                {t.enterEarning}
              </label>
              <div className="relative mb-4">
                <input
                  ref={earningInputRef}
                  type="number"
                  inputMode="decimal"
                  value={earningInput}
                  onChange={(e) => setEarningInput(e.target.value)}
                  placeholder="0"
                  className="w-full tabular text-3xl font-bold py-4 px-4 bg-stone-50 rounded-2xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none"
                  autoFocus
                />
                <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-stone-400 text-xl pointer-events-none`}>
                  {t.currency}
                </span>
              </div>

              {/* Duration display — secondary info */}
              <div className="bg-stone-50 rounded-2xl p-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">{t.duration}</span>
                  <span className="tabular font-semibold">{formatElapsed(elapsedTime)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCancelShift}
                  className="flex-1 py-4 rounded-2xl bg-stone-100 text-stone-600 font-semibold hover:bg-stone-200 transition-colors"
                >
                  {t.cancelShift}
                </button>
                <button
                  onClick={handleSaveShift}
                  disabled={!earningInput}
                  className="flex-1 py-4 rounded-2xl gradient-shift text-white font-semibold disabled:opacity-50 hover:opacity-95 transition-opacity"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ GPS BLOCKED MODAL ============ */}
      {showGpsBlockedModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setShowGpsBlockedModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl p-6 slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <MapPin size={20} className="text-orange-600" />
            </div>
            <h3 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-xl font-bold mb-2`}>
              {t.gpsBlockedTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-4">
              {t.gpsBlockedDesc}
            </p>

            <div className="bg-stone-50 rounded-2xl p-4 mb-6 space-y-2">
              <p className="text-xs text-stone-600">{t.gpsHowToIos}</p>
              <p className="text-xs text-stone-600">{t.gpsHowToAndroid}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowGpsBlockedModal(false)}
                className="flex-1 py-4 rounded-2xl bg-stone-100 text-stone-600 font-semibold hover:bg-stone-200 transition-colors"
              >
                {t.close}
              </button>
              <button
                onClick={() => {
                  setShowGpsBlockedModal(false);
                  // Re-attempt after the user (presumably) turned GPS on
                  setTimeout(() => handleStartShift(), 200);
                }}
                className="flex-1 py-4 rounded-2xl gradient-shift text-white font-semibold hover:opacity-95 transition-opacity"
              >
                {t.tryAgain}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
