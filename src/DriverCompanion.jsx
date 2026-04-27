import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Clock, MapPin, DollarSign, TrendingUp, Calendar, Globe, Coffee, Zap, ChevronRight, Activity, Settings, Download, Upload, Fuel, X, Check } from 'lucide-react';

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
    // Settings
    settings: 'Settings',
    carSettings: 'Vehicle',
    fuelConsumption: 'Fuel Consumption',
    fuelConsumptionUnit: 'L / 100km',
    fuelPrice: 'Fuel Price',
    fuelPriceUnit: 'per liter',
    dataManagement: 'Data',
    exportData: 'Export Backup',
    exportDataDesc: 'Download all your data as a file',
    importData: 'Restore Backup',
    importDataDesc: 'Replace current data with a backup file',
    importFailed: 'Could not read backup file',
    importSuccess: 'Backup restored successfully',
    aboutFuel: 'Used to estimate fuel cost from your tracked distance',
    // Break reminder
    breakTitle: 'Time for a break',
    breakDesc: "You've been driving for 4 hours. Stop for a few minutes — your body and your earnings will both thank you.",
    breakDismiss: 'Got it',
    // Route map
    viewRoute: 'View Route',
    routeMap: 'Shift Route',
    routeNotAvailable: 'No route data for this shift',
    // Hot zone
    hotZone: 'Your Hot Zone',
    hotZoneDesc: 'You earn the most when starting shifts in this area',
    openInMaps: 'Open in Maps',
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
    // Settings
    settings: 'تنظیمات',
    carSettings: 'خودرو',
    fuelConsumption: 'مصرف بنزین',
    fuelConsumptionUnit: 'لیتر در ۱۰۰ کیلومتر',
    fuelPrice: 'قیمت بنزین',
    fuelPriceUnit: 'به ازای هر لیتر',
    dataManagement: 'داده‌ها',
    exportData: 'گرفتن پشتیبان',
    exportDataDesc: 'دانلود همه داده‌ها به صورت فایل',
    importData: 'بازیابی پشتیبان',
    importDataDesc: 'جایگزینی داده‌های فعلی با فایل پشتیبان',
    importFailed: 'خطا در خواندن فایل پشتیبان',
    importSuccess: 'پشتیبان با موفقیت بازیابی شد',
    aboutFuel: 'برای محاسبه هزینه بنزین بر اساس مسافت ثبت‌شده',
    // Break reminder
    breakTitle: 'وقت استراحت',
    breakDesc: '۴ ساعته داری رانندگی می‌کنی. چند دقیقه استراحت کن — هم بدنت و هم درآمدت ازت ممنون میشن.',
    breakDismiss: 'باشه',
    // Route map
    viewRoute: 'نمایش مسیر',
    routeMap: 'مسیر شیفت',
    routeNotAvailable: 'مسیری برای این شیفت ثبت نشده',
    // Hot zone
    hotZone: 'منطقه پرتردد تو',
    hotZoneDesc: 'وقتی شیفت رو از این منطقه شروع می‌کنی، بیشترین درآمد رو داری',
    openInMaps: 'باز کردن در نقشه',
  }
};

// ============ LOCAL STORAGE HELPERS ============
const STORAGE_KEYS = {
  lang: 'dc_lang',
  shifts: 'dc_shifts',
  activeShift: 'dc_active_shift', // { startTime, distance, lastLat, lastLng, route }
  carSettings: 'dc_car_settings', // { fuelConsumption, fuelPrice }
  breakReminderShown: 'dc_break_reminder_shown', // timestamp of last break reminder
};

const DEFAULT_CAR_SETTINGS = {
  fuelConsumption: 8, // liters per 100km
  fuelPrice: 1.5,     // currency per liter
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
  const [carSettings, setCarSettings] = useState(() =>
    loadFromStorage(STORAGE_KEYS.carSettings, DEFAULT_CAR_SETTINGS)
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(null); // shift object or null
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [importError, setImportError] = useState('');

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
  // Route points for the active shift (for map display later)
  const [shiftRoute, setShiftRoute] = useState(savedActiveShift?.route ?? []);
  const [gpsAvailable, setGpsAvailable] = useState(true);
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

  // Persist car settings whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.carSettings, carSettings);
  }, [carSettings]);

  // Persist active shift state (or clear it when shift ends)
  useEffect(() => {
    if (isOnShift && shiftStartTime) {
      saveToStorage(STORAGE_KEYS.activeShift, {
        startTime: shiftStartTime,
        distance: shiftDistance,
        route: shiftRoute,
        lastLat: lastPositionRef.current?.lat,
        lastLng: lastPositionRef.current?.lng,
      });
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.activeShift);
      } catch {}
    }
  }, [isOnShift, shiftStartTime, shiftDistance, shiftRoute]);

  // Break reminder — fire after 4 hours of continuous driving
  useEffect(() => {
    if (!isOnShift) {
      setShowBreakReminder(false);
      return;
    }
    const FOUR_HOURS = 4 * 60 * 60 * 1000;
    const checkBreak = () => {
      const elapsed = Date.now() - shiftStartTime;
      const lastShown = loadFromStorage(STORAGE_KEYS.breakReminderShown, 0);
      // Only show once per 4-hour period
      if (elapsed >= FOUR_HOURS && Date.now() - lastShown > FOUR_HOURS) {
        setShowBreakReminder(true);
        saveToStorage(STORAGE_KEYS.breakReminderShown, Date.now());
      }
    };
    checkBreak();
    const interval = setInterval(checkBreak, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [isOnShift, shiftStartTime]);

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
          setShiftRoute((prev) => [...prev, { lat: latitude, lng: longitude, t: Date.now() }]);
          lastPositionRef.current = { lat: latitude, lng: longitude };
        }
      } else {
        // First reading — store position and start the route
        lastPositionRef.current = { lat: latitude, lng: longitude };
        setShiftRoute([{ lat: latitude, lng: longitude, t: Date.now() }]);
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
        setShiftRoute([{ lat: latitude, lng: longitude, t: Date.now() }]);
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
      startTimestamp: shiftStartTime,
      duration: parseFloat(duration.toFixed(2)),
      distance: parseFloat(shiftDistance.toFixed(1)),
      gpsTracked: gpsAvailable && shiftDistance > 0,
      route: shiftRoute, // array of {lat, lng, t}
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
    setShiftRoute([]);
    lastPositionRef.current = null;
    setEarningInput('');
    setShowEarningModal(false);
  };

  const handleCancelShift = () => {
    setIsOnShift(false);
    setShiftStartTime(null);
    setElapsedTime(0);
    setShiftDistance(0);
    setShiftRoute([]);
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
  // Fuel cost from real car settings: (km × L/100km / 100) × price-per-liter
  const fuelCost = Math.round(
    (todayDistance * carSettings.fuelConsumption / 100) * carSettings.fuelPrice
  );
  // Net profit: only meaningful once we have earnings to subtract from.
  // Showing "-2" while a shift is in progress (earnings still unrecorded)
  // would be confusing — the driver hasn't actually lost money.
  const netProfit = todayTotal > 0 ? todayTotal - fuelCost : 0;
  const perHour = todayHours > 0 ? Math.round(todayTotal / todayHours) : 0;

  // ============ INSIGHTS ENGINE (REAL DATA) ============
  // Compute best earning hours from completed shifts.
  // For each shift, distribute earnings into the hour buckets it spans.
  const computeBestHours = () => {
    const buckets = {
      morning:   { period: t.morning,   value: 0, hours: 0, color: '#FFB87C' },
      afternoon: { period: t.afternoon, value: 0, hours: 0, color: '#FFD18C' },
      evening:   { period: t.evening,   value: 0, hours: 0, color: '#FF8B5C' },
      night:     { period: t.night,     value: 0, hours: 0, color: '#E66A3D' },
    };
    shifts.forEach((s) => {
      if (!s.startTimestamp) return; // older shifts may not have timestamps
      const hour = new Date(s.startTimestamp).getHours();
      let key;
      if (hour >= 6 && hour < 12) key = 'morning';
      else if (hour >= 12 && hour < 17) key = 'afternoon';
      else if (hour >= 17 && hour < 22) key = 'evening';
      else key = 'night';
      buckets[key].value += s.earnings;
      buckets[key].hours += s.duration;
    });
    // Convert into earnings-per-hour for each bucket
    return Object.values(buckets).map((b) => ({
      ...b,
      value: b.hours > 0 ? Math.round(b.value / b.hours) : 0,
    }));
  };
  const realHoursData = computeBestHours();
  const maxHourValue = Math.max(...realHoursData.map((h) => h.value), 1);

  // Compute weekly earnings from real shifts (last 7 days)
  const computeWeeklyData = () => {
    const dayLabels = [t.sunStart, t.monStart, t.tueStart, t.wedStart, t.thuStart, t.friStart, t.satStart];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayKey = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dayEarnings = shifts
        .filter((s) => s.date === dayKey)
        .reduce((sum, s) => sum + s.earnings, 0);
      // Add live earnings to today
      const isToday = i === 0;
      data.push({
        day: dayLabels[d.getDay()],
        earnings: isToday ? dayEarnings : dayEarnings,
      });
    }
    return data;
  };
  const realWeeklyData = computeWeeklyData();
  const realMaxWeekly = Math.max(...realWeeklyData.map((d) => d.earnings), 1);

  // Compute hot zones — cluster shift start points, find the most frequent area
  const computeHotZones = () => {
    const points = shifts
      .filter((s) => s.route && s.route.length > 0)
      .map((s) => ({ lat: s.route[0].lat, lng: s.route[0].lng, earnings: s.earnings }));
    if (points.length < 3) return null;

    // Simple clustering: group points within ~2km of each other
    const clusters = [];
    points.forEach((p) => {
      const existing = clusters.find(
        (c) => haversineKm(c.lat, c.lng, p.lat, p.lng) < 2
      );
      if (existing) {
        existing.count++;
        existing.totalEarnings += p.earnings;
        // Average the cluster center
        existing.lat = (existing.lat * (existing.count - 1) + p.lat) / existing.count;
        existing.lng = (existing.lng * (existing.count - 1) + p.lng) / existing.count;
      } else {
        clusters.push({ lat: p.lat, lng: p.lng, count: 1, totalEarnings: p.earnings });
      }
    });
    // Return the best cluster (most earnings per shift)
    clusters.sort((a, b) => (b.totalEarnings / b.count) - (a.totalEarnings / a.count));
    return clusters[0];
  };
  const hotZone = computeHotZones();

  // ============ EXPORT / IMPORT ============
  const handleExportData = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      shifts,
      carSettings,
      lang,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `driver-companion-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImportError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data.shifts)) throw new Error('Invalid backup file');
        setShifts(data.shifts);
        if (data.carSettings) setCarSettings(data.carSettings);
        if (data.lang) setLang(data.lang);
        setImportError('');
      } catch (err) {
        setImportError(t.importFailed);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // allow re-importing the same file
  };

  // Use the real computed data
  const weeklyData = realWeeklyData;
  const maxWeekly = realMaxWeekly;
  const hoursData = realHoursData;

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-sm font-medium"
          >
            <Globe size={14} />
            {lang === 'en' ? 'فارسی' : 'English'}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center"
            aria-label={t.settings}
          >
            <Settings size={16} />
          </button>
        </div>
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
                <div className="tabular text-2xl font-bold">{todayDistance.toFixed(1)}<span className="text-base text-stone-400 mx-1">{t.km}</span></div>
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
                    <button
                      key={shift.id}
                      onClick={() => shift.route && shift.route.length > 0 && setShowRouteMap(shift)}
                      className="w-full bg-white rounded-2xl p-4 border border-stone-200 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-orange-700">{idx + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold tabular">{shift.start} — {shift.end}</div>
                          <div className="text-xs text-stone-500 tabular">{formatHours(shift.duration)} · {shift.distance} {t.km}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="tabular font-bold">{shift.earnings} {t.currency}</div>
                          <div className="text-xs text-stone-400 tabular">{Math.round(shift.earnings / shift.duration)} {t.currency}/{t.hours}</div>
                        </div>
                        {shift.route && shift.route.length > 0 && (
                          <ChevronRight size={16} className={`text-stone-400 ${isRTL ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Insights — derived from real shift data */}
            {shifts.length >= 5 && (() => {
              // Find best day of week
              const dayTotals = [0, 0, 0, 0, 0, 0, 0]; // Sun..Sat
              const dayCounts = [0, 0, 0, 0, 0, 0, 0];
              shifts.forEach((s) => {
                if (!s.startTimestamp) return;
                const d = new Date(s.startTimestamp).getDay();
                dayTotals[d] += s.earnings;
                dayCounts[d] += 1;
              });
              const dayAverages = dayTotals.map((tot, i) => dayCounts[i] > 0 ? tot / dayCounts[i] : 0);
              const bestDayIdx = dayAverages.indexOf(Math.max(...dayAverages));
              const dayNames = [t.sunStart, t.monStart, t.tueStart, t.wedStart, t.thuStart, t.friStart, t.satStart];

              // Find best time of day
              const bestPeriod = [...realHoursData].sort((a, b) => b.value - a.value)[0];

              // Total days worked in last 7
              const last7Days = new Set();
              shifts.forEach((s) => {
                if (s.startTimestamp && Date.now() - s.startTimestamp < 7 * 24 * 3600 * 1000) {
                  last7Days.add(new Date(s.startTimestamp).toDateString());
                }
              });

              return (
                <div className="mb-6">
                  <h2 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-lg font-bold mb-3`}>
                    {t.insights}
                  </h2>
                  <div className="space-y-2">
                    {bestDayIdx >= 0 && dayAverages[bestDayIdx] > 0 && (
                      <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Zap size={14} className="text-amber-700" />
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed">
                          {dayNames[bestDayIdx]} — {Math.round(dayAverages[bestDayIdx])} {t.currency}
                        </p>
                      </div>
                    )}
                    {bestPeriod && bestPeriod.value > 0 && (
                      <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <TrendingUp size={14} className="text-emerald-700" />
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed">
                          {bestPeriod.period}: {bestPeriod.value} {t.currency}/{t.hours}
                        </p>
                      </div>
                    )}
                    {last7Days.size >= 6 && (
                      <div className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                          <Coffee size={14} className="text-rose-700" />
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed">{t.insight3}</p>
                      </div>
                    )}
                    {hotZone && (
                      <button
                        onClick={() => window.open(`https://www.google.com/maps?q=${hotZone.lat},${hotZone.lng}`, '_blank')}
                        className="w-full bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3 text-left hover:bg-stone-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <MapPin size={14} className="text-orange-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-stone-700">{t.hotZone}</p>
                          <p className="text-xs text-stone-500 mt-0.5">{t.hotZoneDesc}</p>
                        </div>
                        <ChevronRight size={16} className={`text-stone-400 mt-1 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
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
                            style={{ width: `${(h.value / maxHourValue) * 100}%`, background: h.color }}
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

      {/* ============ SETTINGS MODAL ============ */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl slide-up flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-xl font-bold`}>
                  {t.settings}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Vehicle settings */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Fuel size={14} className="text-stone-500" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {t.carSettings}
                  </h4>
                </div>

                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {t.fuelConsumption}
                </label>
                <div className="relative mb-4">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={carSettings.fuelConsumption}
                    onChange={(e) =>
                      setCarSettings({ ...carSettings, fuelConsumption: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full tabular text-lg font-semibold py-3 px-4 bg-stone-50 rounded-2xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none"
                  />
                  <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none`}>
                    {t.fuelConsumptionUnit}
                  </span>
                </div>

                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {t.fuelPrice}
                </label>
                <div className="relative mb-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={carSettings.fuelPrice}
                    onChange={(e) =>
                      setCarSettings({ ...carSettings, fuelPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full tabular text-lg font-semibold py-3 px-4 bg-stone-50 rounded-2xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none"
                  />
                  <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none`}>
                    {t.currency} / {t.fuelPriceUnit}
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.aboutFuel}</p>
              </div>

              {/* Data management */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-stone-500" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {t.dataManagement}
                  </h4>
                </div>

                <button
                  onClick={handleExportData}
                  className="w-full bg-stone-50 hover:bg-stone-100 rounded-2xl p-4 flex items-center gap-3 text-left transition-colors mb-2"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Download size={16} className="text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-stone-800">{t.exportData}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{t.exportDataDesc}</div>
                  </div>
                </button>

                <label className="block w-full bg-stone-50 hover:bg-stone-100 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Upload size={16} className="text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-stone-800">{t.importData}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{t.importDataDesc}</div>
                  </div>
                  <input
                    type="file"
                    accept="application/json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>

                {importError && (
                  <p className="text-xs text-rose-600 mt-2">{importError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ BREAK REMINDER MODAL ============ */}
      {showBreakReminder && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setShowBreakReminder(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl p-6 slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
              <Coffee size={20} className="text-rose-600" />
            </div>
            <h3 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-xl font-bold mb-2`}>
              {t.breakTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {t.breakDesc}
            </p>
            <button
              onClick={() => setShowBreakReminder(false)}
              className="w-full py-4 rounded-2xl gradient-shift text-white font-semibold hover:opacity-95 transition-opacity"
            >
              {t.breakDismiss}
            </button>
          </div>
        </div>
      )}

      {/* ============ ROUTE MAP MODAL ============ */}
      {showRouteMap && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowRouteMap(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl slide-up flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`${isRTL ? 'display-font-fa' : 'display-font-en'} text-xl font-bold`}>
                  {t.routeMap}
                </h3>
                <button
                  onClick={() => setShowRouteMap(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="text-sm text-stone-500 mb-4 tabular">
                {showRouteMap.start} — {showRouteMap.end} · {showRouteMap.distance} {t.km}
              </div>

              {/* Inline SVG map preview of the route */}
              {showRouteMap.route && showRouteMap.route.length > 1 ? (
                <>
                  {(() => {
                    const route = showRouteMap.route;
                    const lats = route.map((p) => p.lat);
                    const lngs = route.map((p) => p.lng);
                    const minLat = Math.min(...lats);
                    const maxLat = Math.max(...lats);
                    const minLng = Math.min(...lngs);
                    const maxLng = Math.max(...lngs);
                    // Normalize to 300x300 viewbox with padding
                    const PAD = 20;
                    const W = 300, H = 300;
                    const latRange = maxLat - minLat || 0.001;
                    const lngRange = maxLng - minLng || 0.001;
                    const points = route.map((p) => {
                      const x = PAD + ((p.lng - minLng) / lngRange) * (W - 2 * PAD);
                      // Flip Y: north should be up
                      const y = PAD + ((maxLat - p.lat) / latRange) * (H - 2 * PAD);
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    });

                    return (
                      <div className="bg-stone-50 rounded-2xl p-4 mb-4">
                        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                          <polyline
                            points={points.join(' ')}
                            fill="none"
                            stroke="#FF8B5C"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Start marker */}
                          <circle
                            cx={points[0].split(',')[0]}
                            cy={points[0].split(',')[1]}
                            r="6"
                            fill="#10B981"
                          />
                          {/* End marker */}
                          <circle
                            cx={points[points.length - 1].split(',')[0]}
                            cy={points[points.length - 1].split(',')[1]}
                            r="6"
                            fill="#EF4444"
                          />
                        </svg>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => {
                      const r = showRouteMap.route;
                      const start = r[0];
                      const end = r[r.length - 1];
                      window.open(
                        `https://www.google.com/maps/dir/${start.lat},${start.lng}/${end.lat},${end.lng}`,
                        '_blank'
                      );
                    }}
                    className="w-full py-4 rounded-2xl gradient-shift text-white font-semibold hover:opacity-95 transition-opacity"
                  >
                    {t.openInMaps}
                  </button>
                </>
              ) : (
                <div className="bg-stone-50 rounded-2xl p-8 text-center">
                  <p className="text-sm text-stone-500">{t.routeNotAvailable}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
