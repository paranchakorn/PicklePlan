import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Activity,
  Award,
  Calendar,
  Clock,
  Dumbbell,
  Heart,
  HelpCircle,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  Play,
  Pause,
  AlertTriangle,
  Lightbulb,
  FileText,
  Trash2,
  Bookmark,
  Volume2,
  VolumeX,
  Plus,
  Compass,
  ArrowRight,
  Inbox,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { sessionPlans, weekRhythms } from './data';
import { Language, BodyCondition, TimeAvailable, Bottleneck, SessionPlan, Exercise, TrainingLog } from './types';

export default function App() {
  // Region: Language & Basic State
  const [lang, setLang] = useState<Language>('EN');
  const [activeTab, setActiveTab] = useState<'finder' | 'coach' | 'rhythm' | 'journal'>('finder');
  
  // Selected Plan State
  const [selectedPlanId, setSelectedPlanId] = useState<number>(1);
  const [selectedVersion, setSelectedVersion] = useState<'easy' | 'full'>('easy');

  // Interactive Assessment Wizard State
  const [bodyCond, setBodyCond] = useState<BodyCondition | null>(null);
  const [timeAvail, setTimeAvail] = useState<TimeAvailable | null>(null);
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null);
  const [diagnosticResultId, setDiagnosticResultId] = useState<number | null>(null);
  const [wizardStep, setWizardStep] = useState<number>(1);

  // Active workout checklist State
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  // Live Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerIsActive, setTimerIsActive] = useState<boolean>(false);
  const [timerInitialSeconds, setTimerInitialSeconds] = useState<number>(0);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(-1);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Journal feedback note State
  const [oneMistakeNote, setOneMistakeNote] = useState<string>('');
  const [loggedVersion, setLoggedVersion] = useState<'easy' | 'full'>('easy');
  const [historyLogs, setHistoryLogs] = useState<TrainingLog[]>([]);

  // Weekly planner match days State
  const [matchDays, setMatchDays] = useState<string[]>(['Wednesday', 'Friday', 'Sunday']);

  // Zoomable Image Viewer State
  const [zoomImg, setZoomImg] = useState<{ url: string; title: string } | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [zoomOffset, setZoomOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Panning movement helpers
  const handlePanStart = (clientX: number, clientY: number) => {
    if (zoomScale <= 1) return; // Only pan when zoomed in
    setIsPanning(true);
    panStartRef.current = { x: clientX - zoomOffset.x, y: clientY - zoomOffset.y };
  };

  const handlePanMove = (clientX: number, clientY: number) => {
    if (!isPanning) return;
    setZoomOffset({
      x: clientX - panStartRef.current.x,
      y: clientY - panStartRef.current.y
    });
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const toggleZoomScale = () => {
    if (zoomScale > 1) {
      setZoomScale(1);
      setZoomOffset({ x: 0, y: 0 });
    } else {
      setZoomScale(2.5);
      setZoomOffset({ x: 0, y: 0 });
    }
  };

  // Keyboard escape handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load Saved Logs from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pickleball_training_logs_v1');
      if (saved) {
        setHistoryLogs(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading history logs', e);
    }
  }, []);

  // Save changes to LocalStorage
  const saveLogs = (newLogs: TrainingLog[]) => {
    setHistoryLogs(newLogs);
    try {
      localStorage.setItem('pickleball_training_logs_v1', JSON.stringify(newLogs));
    } catch (e) {
      console.error('Error saving logs', e);
    }
  };

  // Synthesize workout beep sound using Web Audio API
  const playBeep = (frequency = 750, duration = 0.45) => {
    if (!audioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio playback failed or is blocked by browser interaction guidelines.', e);
    }
  };

  // Handle Active Countdown Timer ticking
  useEffect(() => {
    if (timerIsActive && timerSeconds > 0) {
      timerIntervalRef.current = setTimeout(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            // Reached zero! Play beep sound
            playBeep(900, 0.6);
            setTimerIsActive(false);
            
            // Auto complete the exercise in list
            const currentPlan = sessionPlans.find(p => p.id === selectedPlanId);
            if (currentPlan && activeExerciseIndex !== -1) {
              const exerciseList = selectedVersion === 'easy' ? currentPlan.easyExercises : currentPlan.fullExercises;
              const completedKey = `${selectedPlanId}-${selectedVersion}-${activeExerciseIndex}`;
              if (!completedExercises.includes(completedKey)) {
                setCompletedExercises(prevList => [...prevList, completedKey]);
              }
            }
            return 0;
          }
          // Halfway reminder beep
          if (prev === Math.floor(timerInitialSeconds / 2)) {
            playBeep(600, 0.15);
          }
          // 3-second countdown tick
          if (prev <= 4) {
            playBeep(500, 0.1);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearTimeout(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearTimeout(timerIntervalRef.current);
      }
    };
  }, [timerSeconds, timerIsActive, selectedPlanId, selectedVersion, activeExerciseIndex]);

  // Map 3 Answers Wizard to a recommended Day type
  useEffect(() => {
    if (bodyCond && timeAvail && bottleneck) {
      // 1. If tired -> Day 1 Stretch & Recovery is heavily favored
      if (bodyCond === 'tired') {
        setDiagnosticResultId(1);
        return;
      }
      
      // 2. Direct map of bottleneck needs to specific optimal days
      const bottleneckMapping: Record<Bottleneck, number> = {
        'recovery': 9, // Post-Match Cooldown
        'mobility': 1, // Stretch / Recovery Day
        'footwork': 2, // Footwork Day
        'strength': 3, // Strength Day
        'ready_position': 4, // Fix Position Day
        'serve': 5, // Serve + Return Day
        'soft_touch': 6, // Soft Hands / Touch Day
        'wall_reps': 7, // Wall Drill Day
        'match_warmup': 8 // Pre-Match Warm-up Day
      };

      setDiagnosticResultId(bottleneckMapping[bottleneck]);
    } else {
      setDiagnosticResultId(null);
    }
  }, [bodyCond, timeAvail, bottleneck]);

  // Pre-loaded quick diagnosis buttons mapper
  const handleQuickChoice = (type: string) => {
    // Scroll smoothly to active routine section
    let mappedId = 1;
    switch (type) {
      case 'tired': mappedId = 1; break;
      case 'slow-legs': mappedId = 2; break;
      case 'weak': mappedId = 3; break;
      case 'forget-pos': mappedId = 4; break;
      case 'miss-serve': mappedId = 5; break;
      case 'overhit': mappedId = 6; break;
      case 'no-court': mappedId = 7; break;
      case 'play-today': mappedId = 8; break;
    }
    setSelectedPlanId(mappedId);
    setCompletedExercises([]);
    setOneMistakeNote('');
    setActiveExerciseIndex(-1);
    setTimerIsActive(false);
    setTimerSeconds(0);
    setActiveTab('coach');

    // Pre-select survey states for visual sync
    if (type === 'tired') {
      setBodyCond('tired'); setBottleneck('mobility'); setTimeAvail('short');
    } else if (type === 'slow-legs') {
      setBodyCond('fresh'); setBottleneck('footwork'); setTimeAvail('long');
    } else if (type === 'weak') {
      setBodyCond('fresh'); setBottleneck('strength'); setTimeAvail('long');
    } else if (type === 'forget-pos') {
      setBodyCond('fresh'); setBottleneck('ready_position'); setTimeAvail('short');
    } else if (type === 'miss-serve') {
      setBodyCond('fresh'); setBottleneck('serve'); setTimeAvail('long');
    } else if (type === 'overhit') {
      setBodyCond('stiff'); setBottleneck('soft_touch'); setTimeAvail('short');
    } else if (type === 'no-court') {
      setBodyCond('fresh'); setBottleneck('wall_reps'); setTimeAvail('short');
    } else if (type === 'play-today') {
      setBodyCond('fresh'); setBottleneck('match_warmup'); setTimeAvail('short');
    }
  };

  // Launch Exercise Timer
  const startTimerForExercise = (index: number, exercise: Exercise) => {
    if (exercise.durationSeconds) {
      setActiveExerciseIndex(index);
      setTimerInitialSeconds(exercise.durationSeconds);
      setTimerSeconds(exercise.durationSeconds);
      setTimerIsActive(true);
      playBeep(800, 0.2);
    }
  };

  // Handle manual complete toggle
  const toggleExerciseCheck = (index: number) => {
    const key = `${selectedPlanId}-${selectedVersion}-${index}`;
    if (completedExercises.includes(key)) {
      setCompletedExercises(prev => prev.filter(item => item !== key));
    } else {
      setCompletedExercises(prev => [...prev, key]);
      playBeep(650, 0.15);
    }
  };

  // Log currently active workout in Diary
  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const activePlan = sessionPlans.find(p => p.id === selectedPlanId);
    if (!activePlan) return;

    const defaultNotes = lang === 'TH' 
      ? `ซ้อมเสร็จเรียบร้อยแล้ว: ${activePlan.titleTh} (${selectedVersion === 'easy' ? 'รุ่นย่อ 10-15 นาที' : 'รุ่นเต็มสูตร'})`
      : `Completed Workout: ${activePlan.titleEn} (${selectedVersion === 'easy' ? 'Busy/Easy' : 'Full Session'})`;

    const newLog: TrainingLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sessionId: activePlan.id,
      sessionTitle: lang === 'TH' ? activePlan.titleTh : activePlan.titleEn,
      version: selectedVersion,
      notes: oneMistakeNote.trim() || defaultNotes
    };

    saveLogs([newLog, ...historyLogs]);
    setOneMistakeNote('');
    playBeep(950, 0.55);
    setActiveTab('journal');
  };

  // Clear single log item
  const handleRemoveLog = (id: string) => {
    if (confirm(lang === 'TH' ? 'คุณแน่ใจหรือไม่ที่จะลบบันทึกประวัตินี้?' : 'Are you sure you want to delete this session log?')) {
      const filtered = historyLogs.filter(log => log.id !== id);
      saveLogs(filtered);
    }
  };

  // Clear all logs
  const handleClearAllLogs = () => {
    if (confirm(lang === 'TH' ? 'คุณแน่ใจหรือไม่ที่จะล้างประวัติการซ้อมทั้งหมด?' : 'Are you sure you want to clear all training history logs?')) {
      saveLogs([]);
    }
  };

  const getWeekAdvice = (dayName: string) => {
    const isMatch = matchDays.includes(dayName);
    
    // Core conditions based on match schedules
    if (isMatch) {
      return {
        labelTH: '💥 แข่งจริงคอร์ทหลัก! ซ้อมวอร์มอัพ (Day 8) ก่อนเล่น และ คูลดาวน์ (Day 9) ทันทีหลังจบเกม',
        labelEN: '💥 Match Day! Run Pre-Match Warm-up (Day 8) before and Post-Match Cooldown (Day 9) after play.',
        bgColor: 'bg-emerald-950/25 border-emerald-900/50 text-emerald-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }
    
    // If play is Wednesday, Friday, Sunday, then Monday is Recovery, Tuesday/Thursday is Strength, Saturday is Light
    const hasMonWedSunHeavy = matchDays.includes('Wednesday') && matchDays.includes('Friday') && matchDays.includes('Sunday');
    
    if (dayName === 'Monday') {
      if (matchDays.includes('Sunday')) {
        return {
          labelTH: '🛌 วันฟื้นตัวขั้นสุด! พักผ่อนกล้ามเนื้อสะสมหรือยืดเหยียดเบา Day 1 (Stretch / Recovery Day)',
          labelEN: '🛌 Essential Recovery! Relieve leg acids with Day 1 (Stretch / Recovery Day)',
          bgColor: 'bg-[#241A0B]/40 border-amber-950/40 text-amber-300 text-xs py-1.5 px-3 rounded-md border font-sans'
        };
      }
      return {
        labelTH: '🎯 ซ้อมทักษะ: ซ้อมฝึกฟุตเวิร์กกางขา Day 2 หรือ ซ้อมขาสวมเป้ากำแพง Day 7',
        labelEN: '🎯 Skill focus: Run Footwork Day 2 or clean contact Wall Drill Day 7',
        bgColor: 'bg-indigo-950/20 border-indigo-900/30 text-indigo-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }

    if (dayName === 'Tuesday') {
      return {
        labelTH: '💪 วันฟิตกล้ามเนื้อแกนกลาง: ฝึกกำลังแรงตึงกล้ามเนื้อขาตระหนักมั่นคง Day 3 (Strength Day)',
        labelEN: '💪 Functional strength: Strengthen hips, core and legs with Day 3 (Strength Day)',
        bgColor: 'bg-blue-950/20 border-blue-900/30 text-blue-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }

    if (dayName === 'Wednesday') {
      return {
        labelTH: '🎯 ซ้อมคุมทิศทางท็อปสปินเหนียวแน่น Day 4 (Dink / Control Day)',
        labelEN: '🎯 Soft touch control: Practice kitchen control on Day 4 (Dink / Control Day)',
        bgColor: 'bg-emerald-950/20 border-emerald-900/30 text-emerald-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }

    if (dayName === 'Thursday') {
      return {
        labelTH: '💪 วันฟิตกระชับแรงขา: เกร็งสะโพกยึดจุดปะทะมั่นคง Day 3 (Strength Day) เพื่อสระแรงหนัก',
        labelEN: '💪 Leg & core stability: Day 3 (Strength Day) to keep hips grounded.',
        bgColor: 'bg-blue-950/20 border-blue-900/30 text-blue-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }

    if (dayName === 'Saturday') {
      if (matchDays.includes('Friday') && matchDays.includes('Sunday')) {
        return {
          labelTH: '🍃 วันซ้อมมือเบานุ่มนวล: ปรับคุมสัมผัสลดเกร็งมือเหนื่อยล้า Day 6 (Soft Touch) ห้ามกระโดด',
          labelEN: '🍃 Touch day! Calm mind and wrist using Day 6 (Soft Hands / Touch Day). Clean and slow.',
          bgColor: 'bg-[#1D2B16]/20 border-brand-lime/10 text-brand-lime text-xs py-1.5 px-3 rounded-md border font-sans'
        };
      }
      return {
        labelTH: '🎯 ซ้อมลูกเสิร์ฟหรือเคาะกำแพงเบาเสถียร Day 5 (Serve + Return) หรือ Day 7 (Wall Drill)',
        labelEN: '🎯 Drill & Reps: Practice consistent serves Day 5 or target wall control Day 7',
        bgColor: 'bg-neutral-900 border-neutral-800 text-neutral-300 text-xs py-1.5 px-3 rounded-md border font-sans'
      };
    }

    return {
      labelTH: '🧘 วันเลือกซ่อมแซมจุดบกพร่องตามสภาพร่างกาย หรือทำกายภาพยืดคลายเบาๆ',
      labelEN: '🧘 Active recovery or focus drill. Pick whichever routine heals today\'s main bottleneck.',
      bgColor: 'bg-[#161616] border-[#222] text-neutral-300 text-xs py-1.5 px-3 rounded-md border font-sans'
    };
  };

  const weekdays = [
    { name: 'Monday', th: 'จันทร์' },
    { name: 'Tuesday', th: 'อังคาร' },
    { name: 'Wednesday', th: 'พุธ' },
    { name: 'Thursday', th: 'พฤหัสบดี' },
    { name: 'Friday', th: 'ศุกร์' },
    { name: 'Saturday', th: 'เสาร์' },
    { name: 'Sunday', th: 'อาทิตย์' }
  ];

  const handleToggleMatchDay = (day: string) => {
    if (matchDays.includes(day)) {
      setMatchDays(prev => prev.filter(d => d !== day));
    } else {
      setMatchDays(prev => [...prev, day]);
    }
  };

  // Find recommended session index based on selected diagnostic result
  const currentlySelectedPlan = sessionPlans.find(p => p.id === selectedPlanId) || sessionPlans[0];

  return (
    <div id="app-root-container" className="min-h-screen bg-[#0A0A0A] font-sans text-[#E5E5E5] flex flex-col antialiased">
      {/* HEADER SECTION --- STYLISH SPORTS ACCENTS */}
      <header id="app-header" className="sticky top-0 bg-[#0E0E0E]/90 backdrop-blur-md shadow-lg border-b border-neutral-950 z-30 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-lime flex items-center justify-center shadow-lg shadow-brand-lime/10">
              <Activity className="w-5 h-5 text-brand-dark" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                {lang === 'TH' ? 'คัมภีร์เซฟตี้ พิกเกิลบอล' : 'Pickleball Pro Coach'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio Feedback Controller */}
            <button
              id="audio-feed-controller"
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                playBeep(700, 0.1);
              }}
              className={`p-2 rounded-lg border transition-all ${
                audioEnabled 
                  ? 'border-brand-lime/30 bg-brand-lime/10 text-brand-lime hover:bg-brand-lime/20' 
                  : 'border-neutral-800 bg-neutral-900/50 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300'
              }`}
              title={audioEnabled ? 'Disable Timer Sounds' : 'Enable Timer Sounds'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switch Tag */}
            <div className="bg-neutral-900 p-0.5 rounded-lg flex items-center border border-neutral-800 font-mono text-xs font-semibold">
              <button
                id="lang-th-btn"
                onClick={() => setLang('TH')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'TH' ? 'bg-[#1D2B16] text-brand-lime shadow-sm font-bold border border-brand-lime/20' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                TH
              </button>
              <button
                id="lang-en-btn"
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'EN' ? 'bg-[#1D2B16] text-brand-lime shadow-sm font-bold border border-brand-lime/20' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK SUB-NAVBAR FOR MOBILE VIEWS */}
      <nav id="quick-sub-navbar" className="bg-[#121212] text-white border-b border-neutral-900 sticky top-[64px] z-20 shadow-md">
        <div className="max-w-5xl mx-auto px-2 py-0.5 flex items-center overflow-x-auto scrollbar-none whitespace-nowrap">
          <button
            id="nav-tab-finder"
            onClick={() => setActiveTab('finder')}
            className={`px-4 py-3 text-xs font-bold transition-all relative flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'finder' ? 'text-brand-lime bg-[#1D2B16]/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {lang === 'TH' ? 'ค้นหาแผนซ้อม' : 'Plan Finder'}
            {activeTab === 'finder' && (
              <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
            )}
          </button>
          
          <button
            id="nav-tab-coach"
            onClick={() => setActiveTab('coach')}
            className={`px-4 py-3 text-xs font-bold transition-all relative flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'coach' ? 'text-brand-lime bg-[#1D2B16]/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            {lang === 'TH' ? 'ดูท่าซ้อมจับเวลา' : 'Coach & Timer'}
            {activeTab === 'coach' && (
              <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
            )}
          </button>

          <button
            id="nav-tab-rhythm"
            onClick={() => setActiveTab('rhythm')}
            className={`px-4 py-3 text-xs font-bold transition-all relative flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'rhythm' ? 'text-brand-lime bg-[#1D2B16]/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {lang === 'TH' ? 'จังหวะเหลี่ยมสัปดาห์' : 'Weekly Rhythm'}
            {activeTab === 'rhythm' && (
              <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
            )}
          </button>

          <button
            id="nav-tab-journal"
            onClick={() => setActiveTab('journal')}
            className={`px-4 py-3 text-xs font-bold transition-all relative flex items-center gap-1.5 uppercase tracking-wider ${
              activeTab === 'journal' ? 'text-brand-lime bg-[#1D2B16]/30' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {lang === 'TH' ? 'ไดอารี่คอร์ท' : 'Training Journal'}
            {activeTab === 'journal' && (
              <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
            )}
          </button>
        </div>
      </nav>

      {/* CORE FRAME FOR RESPONSIVENESS */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:py-6 space-y-6">
        
        {/* TAB 1: FINDER */}
        {activeTab === 'finder' && (
          <div className="space-y-6">
            
            {/* INTERACTIVE 3-QUESTION DIAGNOSIS */}
            <section id="wizard-diagnosis-section" className="bg-[#121212] rounded-2xl p-5 md:p-6 shadow-xl border border-neutral-800">
              <div className="flex items-center space-x-2.5 mb-4">
                <Sparkles className="w-5 h-5 text-brand-lime animate-pulse" />
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {lang === 'TH' ? 'ประเมินด่วน 3 คำถามโจทย์ใหญ่' : '3-Question Smart Assessment'}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    {lang === 'TH' ? 'ค้นหาแผนการบริหารตามพละกำลังและอาการคอขวดสะดุด' : 'Identify your optimal session based on physical status, schedule, and bottleneck.'}
                  </p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div onClick={() => setWizardStep(1)} className={`cursor-pointer h-2 rounded-full transition-all ${wizardStep >= 1 ? 'bg-brand-lime' : 'bg-neutral-800'}`} />
                <div onClick={() => { if (bodyCond) setWizardStep(2); }} className={`h-2 rounded-full transition-all ${bodyCond ? 'cursor-pointer' : 'cursor-not-allowed'} ${wizardStep >= 2 ? 'bg-brand-lime' : 'bg-neutral-800'}`} />
                <div onClick={() => { if (bodyCond && timeAvail) setWizardStep(3); }} className={`h-2 rounded-full transition-all ${bodyCond && timeAvail ? 'cursor-pointer' : 'cursor-not-allowed'} ${wizardStep >= 3 ? 'bg-brand-lime' : 'bg-neutral-800'}`} />
              </div>

              <div className="min-h-[180px]">
                {wizardStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">STEP 1: BODY CONDITION</span>
                    <h3 className="text-base font-bold text-[#E5E5E5]">
                      {lang === 'TH' ? 'ตอนนี้สภาพร่างกายของคุณเปนเช่นไร?' : 'Am I tired, sore, stiff, or fresh today?'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {[
                        { id: 'tired', textTh: 'เหนื่อยล้าสะสม / เพลียเล่ห์', textEn: 'Tired (Bad sleep / Overworked)', color: 'border-orange-500/20 hover:bg-orange-500/5 hover:border-orange-500/50 text-orange-400' },
                        { id: 'sore', textTh: 'ระบมกล้ามเนื้อสะพานระวิง', textEn: 'Sore (Muscle muscle aches)', color: 'border-red-500/20 hover:bg-red-500/5 hover:border-red-500/50 text-red-400' },
                        { id: 'stiff', textTh: 'ข้อตึงเอ็นยึดสะบักเบียด', textEn: 'Stiff (Heavy joints / Low mobility)', color: 'border-amber-500/20 hover:bg-amber-500/5 hover:border-amber-500/50 text-amber-400' },
                        { id: 'fresh', textTh: 'แรงดี สดชื่น กระปรี้กระเปร่า', textEn: 'Fresh (Ready to crush sessions)', color: 'border-brand-lime/20 hover:bg-brand-lime/5 hover:border-brand-lime/50 text-brand-lime' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setBodyCond(item.id as BodyCondition);
                            setWizardStep(2);
                            playBeep(700, 0.08);
                          }}
                          className={`text-left p-3 rounded-xl border text-sm transition-all flex flex-col justify-between ${item.color} ${bodyCond === item.id ? 'bg-[#1D2B16] border-brand-lime text-brand-lime hover:bg-[#1D2B16] hover:border-brand-lime' : 'bg-[#181818]'}`}
                        >
                          <span className="font-bold">{lang === 'TH' ? item.textTh : item.textEn}</span>
                          <span className="text-xs opacity-80 uppercase mt-1 font-mono tracking-wider">{item.id}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">STEP 2: AVAILABLE TIME</span>
                    <h3 className="text-base font-bold text-[#E5E5E5]">
                      {lang === 'TH' ? 'วันนี้คุณมีเวลาให้กับการซ้อมยืดท่าเท่าไหร่?' : 'Do I have 10–15 minutes or 30–60 minutes?'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {[
                        { id: 'short', titleTh: 'ด่วน / ยุ่งมาก (10-15 นาที)', titleEn: 'Busy / Easy (10-15 Min)', descTh: 'เน้นยึดท่าฉับไวเสร็จเร็ว', descEn: 'High efficiency' },
                        { id: 'long', titleTh: 'เต็มที่ / จัดเต็ม (30-60 นาที)', titleEn: 'Full Session (30-60 Min)', descTh: 'ฟื้นฟูกายภาพจัดวางรอบคอบ', descEn: 'Complete workout' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTimeAvail(item.id as TimeAvailable);
                            setWizardStep(3);
                            playBeep(700, 0.08);
                          }}
                          className={`text-left p-4 rounded-xl border text-sm transition-all ${timeAvail === item.id ? 'bg-[#1D2B16] border-brand-lime text-brand-lime font-bold' : 'bg-[#181818] border-[#222] hover:border-neutral-600 text-neutral-300'}`}
                        >
                          <div className="font-bold">{lang === 'TH' ? item.titleTh : item.titleEn}</div>
                          <div className="text-xs opacity-75 mt-1">{lang === 'TH' ? item.descTh : item.descEn}</div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setWizardStep(1)}
                      className="text-xs text-neutral-400 underline flex items-center hover:text-white"
                    >
                      {lang === 'TH' ? 'ย้อนกลับไปสภาพร่างกาย' : 'Back to Step 1'}
                    </button>
                  </motion.div>
                )}

                {wizardStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">STEP 3: CHOOSE BOTTLENECK / NEED</span>
                    <h3 className="text-base font-bold text-[#E5E5E5]">
                      {lang === 'TH' ? 'จุดไหนเป็น "คอขวดสะดุด" หรือเป้าหมายวันนี้ของคุณ?' : 'What is your current game bottleneck/need?'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                      {[
                        { id: 'mobility', th: 'ความยืดหยุ่น / สะโพกหนืด', en: 'Mobility & Stiffness' },
                        { id: 'footwork', th: 'เคลื่อนไหวช้า / ขาหนัก', en: 'Footwork & Speed' },
                        { id: 'strength', th: 'พละกำลังน้อย / ไม่มั่นคง', en: 'Leg Strength & Core' },
                        { id: 'ready_position', th: 'ลืมรีเซตท่าทางพิกเกิล', en: 'Ready Position Check' },
                        { id: 'serve', th: 'เสิร์ฟพัง / รีเทิร์นคืนหลวม', en: 'Serves & Returns' },
                        { id: 'soft_touch', th: 'หวดแรงล้นคอร์ท / คุมดิงก์เสีย', en: 'Soft Touch & Control' },
                        { id: 'wall_reps', th: 'ไม่มีคู่แข่ง/ซ้อมเดี่ยวจำลอง', en: 'Paddle Reps (No Court)' },
                        { id: 'match_warmup', th: 'กำลังจะลงสนามแข่งเช้านี้', en: 'Pre-Match Warm-up' },
                        { id: 'recovery', th: 'เหนื่อยสะสม คลายตะคริวหลังแข่ง', en: 'Post-Match Recovery' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setBottleneck(item.id as Bottleneck);
                            playBeep(850, 0.15);
                          }}
                          className={`text-left p-2.5 rounded-xl border text-xs transition-all ${bottleneck === item.id ? 'bg-[#1D2B16] border-brand-lime text-brand-lime font-bold' : 'bg-[#181818] border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-300'}`}
                        >
                          <div>{lang === 'TH' ? item.th : item.en}</div>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setWizardStep(2)}
                        className="text-xs text-neutral-400 underline flex items-center hover:text-white"
                      >
                        {lang === 'TH' ? 'ย้อนกลับไปตั้งเวลา' : 'Back to Step 2'}
                      </button>

                      {bodyCond && timeAvail && bottleneck && (
                        <button
                          onClick={() => {
                            if (diagnosticResultId) {
                               setSelectedPlanId(diagnosticResultId);
                               setSelectedVersion(timeAvail === 'short' ? 'easy' : 'full');
                               setCompletedExercises([]);
                               setOneMistakeNote('');
                               setActiveExerciseIndex(-1);
                               setTimerIsActive(false);
                               setTimerSeconds(0);
                               setActiveTab('coach');
                               playBeep(900, 0.25);
                            }
                          }}
                          className="px-4 py-2 bg-brand-lime text-brand-dark rounded-xl font-bold text-xs shadow-md shadow-brand-lime/25 hover:bg-lime-400 transition-all flex items-center space-x-1.5"
                        >
                          <span>{lang === 'TH' ? 'เปิดแผนซ้อมที่แนะนำ!' : 'Open Session Now!'}</span>
                          <ArrowRight className="w-3.5 h-3.5 hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Collapsed computed recommendation highlight */}
              {diagnosticResultId && (
                <div className="mt-4 p-3.5 bg-[#172312] rounded-xl border border-brand-lime/20 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-brand-lime rounded-lg text-brand-dark">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 font-medium">
                        {lang === 'TH' ? 'คำแนะนำอิงตามสุขภาพทางร่างกาย:' : 'Smart Routine Recommended for You:'}
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        {lang === 'TH' 
                          ? sessionPlans.find(p => p.id === diagnosticResultId)?.titleTh 
                          : sessionPlans.find(p => p.id === diagnosticResultId)?.titleEn}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedPlanId(diagnosticResultId);
                      if (timeAvail) {
                        setSelectedVersion(timeAvail === 'short' ? 'easy' : 'full');
                      }
                      setCompletedExercises([]);
                      setOneMistakeNote('');
                      setActiveExerciseIndex(-1);
                      setTimerIsActive(false);
                      setTimerSeconds(0);
                      setActiveTab('coach');
                    }}
                    className="px-3.5 py-2 bg-brand-lime text-brand-dark rounded-lg font-bold text-xs hover:bg-[#a5f34e] transition-all"
                  >
                    {lang === 'TH' ? 'เข้าห้องซ้อมเลย' : 'Train Now'}
                  </button>
                </div>
              )}
            </section>

            {/* QUICK-CHOICE PANELS AS REQUESTED IN TRIPLE QUESTIONS ASKING */}
            <section id="quick-action-shortcuts" className="bg-[#121212] rounded-2xl p-5 md:p-6 shadow-xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{lang === 'TH' ? 'ปุ่มลัดเลือกด่วนตามขีดจำกัด!' : 'How to Choose Quickly'}</h3>
                  <p className="text-xs text-neutral-400">{lang === 'TH' ? 'กดครั้งเดียวเจาะจงแผนซ้อมตอบโจทย์ทันควัน' : 'Press once to load the routine matching your current direct bottleneck.'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { id: 'tired', textTh: '😫 รู้สึกเหนื่อยล้าสะสม', textEn: '😫 Feel Tired', label: 'Stretch / Recovery', color: 'border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-400' },
                  { id: 'slow-legs', textTh: '🐢 ขารู้สึกหนืดช้าก้าวช้า', textEn: '🐢 Legs Feel Slow', label: 'Footwork Day', color: 'border-yellow-550/20 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-400' },
                  { id: 'weak', textTh: '🏋️ ร่างกายสั่นเอ่น/แรงนิ่ง', textEn: '🏋️ Feel Unstable', label: 'Strength Day', color: 'border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-400' },
                  { id: 'forget-pos', textTh: '🤔 ลืมเซ็ตไม้กลับมาหน้าอก', textEn: '🤔 Forgot Ready Pos', label: 'Fix Position Day', color: 'border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400' },
                  { id: 'miss-serve', textTh: '🎾 เสิร์ฟเป๋ ตกเหลี่ยมออกง่าย', textEn: '🎾 Miss Serves', label: 'Serve & Return', color: 'border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 hover:border-pink-400' },
                  { id: 'overhit', textTh: '💥 ลงน้ำหนักหวดเปะปะ', textEn: '💥 Overhit Bola', label: 'Soft Touch Day', color: 'border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-400' },
                  { id: 'no-court', textTh: '🧱 ไม่มีสนาม/ซ้อมผนังกำแพง', textEn: '🧱 Off-court practice', label: 'Wall Drill Day', color: 'border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 hover:border-sky-400' },
                  { id: 'play-today', textTh: '🔥 วันนี้มีแมตช์ต้องแข่งจริง', textEn: '🔥 Play Today Match', label: 'Warm-up / Cooldown', color: 'border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-400' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuickChoice(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all group cursor-pointer ${item.color}`}
                  >
                    <div className="font-bold text-xs text-white">
                      {lang === 'TH' ? item.textTh : item.textEn}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-1 font-mono uppercase font-bold tracking-widest flex items-center justify-between group-hover:text-brand-lime">
                      <span>{item.label}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* EXPANDED BROWSABLE MANUAL GRID */}
            <section id="browsable-plans-grid" className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">{lang === 'TH' ? 'รายการแผนฝึกซ้อมพิกเกิลบอลทั้งหมด (9 แผน)' : 'Standard Routine Library (9 Plans)'}</h3>
                <p className="text-xs text-neutral-400">{lang === 'TH' ? 'คลิกเลือกแผนที่ต้องการเจาะลึกเพื่อเข้าไปยังหน้าจัดโปรแกรมและเครื่องมือจับเวลา' : 'Browse individual plans below to see specific warmups, drills and coaching constraints.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 font-sans">
                {sessionPlans.map((plan) => {
                  const isDiagMatch = plan.id === diagnosticResultId;
                  const isCurrentlySelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`relative bg-[#121212] rounded-2xl p-5 shadow-xl border transition-all flex flex-col justify-between group ${
                        isCurrentlySelected 
                          ? 'border-brand-lime ring-1 ring-brand-lime' 
                          : 'border-neutral-800 hover:border-neutral-700 hover:shadow-2xl'
                      }`}
                    >
                      {isDiagMatch && (
                        <div className="absolute top-3 right-3 bg-brand-lime text-brand-dark font-mono text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse z-10">
                          RECOMMENDED
                        </div>
                      )}

                      {(plan.easyImageUrl || plan.imageUrl) && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card selection from firing if they just want to view image
                            setZoomImg({
                              url: plan.easyImageUrl || plan.imageUrl || '',
                              title: lang === 'TH' ? plan.titleTh : plan.titleEn
                            });
                            setZoomScale(1);
                            setZoomOffset({ x: 0, y: 0 });
                          }}
                          className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-neutral-850 relative group/img cursor-zoom-in"
                        >
                          <img 
                            src={plan.easyImageUrl || plan.imageUrl} 
                            alt={lang === 'TH' ? plan.titleTh : plan.titleEn} 
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" 
                            onError={(e) => {
                              if (plan.fallbackUrl) {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = plan.fallbackUrl;
                              }
                            }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="bg-black/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center space-x-1 px-3 py-1.5 backdrop-blur-sm pointer-events-none">
                              <ZoomIn className="w-3.5 h-3.5 text-brand-lime" />
                              <span>{lang === 'TH' ? 'คลิกดูท่าเต็ม' : 'Click to zoom'}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-7 h-7 rounded-lg bg-neutral-800 text-white flex items-center justify-center font-bold font-mono text-xs text-center border border-neutral-700">
                            {plan.id}
                          </span>
                          <span className="text-[10px] uppercase font-mono font-bold text-brand-lime tracking-wider">
                            {plan.easyDurationRange} - {plan.fullDurationRange}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-extrabold text-base text-white tracking-tight group-hover:text-brand-lime transition-colors">
                            {lang === 'TH' ? plan.titleTh : plan.titleEn}
                          </h4>
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                            {lang === 'TH' ? plan.useWhenTh : plan.useWhenEn}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono font-medium text-[#888]">
                          {plan.easyExercises.length} / {plan.fullExercises.length} Drills
                        </span>
                        
                        <button
                          onClick={() => {
                            setSelectedPlanId(plan.id);
                            setCompletedExercises([]);
                            setOneMistakeNote('');
                            setActiveExerciseIndex(-1);
                            setTimerIsActive(false);
                            setTimerSeconds(0);
                            setActiveTab('coach');
                            playBeep(850, 0.12);
                          }}
                          className="px-3.5 py-1.5 bg-[#1a1a1a] border border-neutral-800 text-neutral-300 hover:bg-brand-lime hover:text-brand-dark hover:border-brand-lime rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{lang === 'TH' ? 'ตั้งค่าเริ่มซ้อม' : 'Setup Routine'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: ACTIVE COACHING & TIMERS */}
        {activeTab === 'coach' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            
            {/* LEFT COLUMN: ACTIVE PLAN SUMMARY CARD */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-[#121212] rounded-2xl p-5 shadow-xl border border-neutral-800 space-y-4">
                
                {/* Switch Plan Select Box */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-[#888] uppercase">
                    {lang === 'TH' ? 'แก้ไขหมวดหมู่การซ้อม' : 'SWITCH WORKOUT PLAN'}
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => {
                      setSelectedPlanId(parseInt(e.target.value));
                      setCompletedExercises([]);
                      setActiveExerciseIndex(-1);
                      setTimerIsActive(false);
                      setTimerSeconds(0);
                      playBeep(700, 0.1);
                    }}
                    className="w-full rounded-xl border border-neutral-800 p-2.5 text-xs font-bold text-[#E5E5E5] bg-[#161616] focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  >
                    {sessionPlans.map((plan) => (
                      <option key={plan.id} value={plan.id} className="bg-[#161616] text-[#E5E5E5]">
                        {lang === 'TH' ? plan.titleTh : plan.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-px bg-neutral-800" />

                {(() => {
                  const displayImg = selectedVersion === 'easy' 
                    ? (currentlySelectedPlan.easyImageUrl || currentlySelectedPlan.imageUrl)
                    : (currentlySelectedPlan.fullImageUrl || currentlySelectedPlan.imageUrl);
                  return displayImg && (
                    <div 
                      onClick={() => {
                        setZoomImg({
                          url: displayImg,
                          title: (lang === 'TH' ? currentlySelectedPlan.titleTh : currentlySelectedPlan.titleEn) + ` (${selectedVersion === 'easy' ? (lang === 'TH' ? 'แบบย่อ' : 'Easy') : (lang === 'TH' ? 'ตัวเต็ม' : 'Full')})`
                        });
                        setZoomScale(1);
                        setZoomOffset({ x: 0, y: 0 });
                      }}
                      className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-850 relative group cursor-zoom-in"
                    >
                      <img 
                        src={displayImg} 
                        alt={lang === 'TH' ? currentlySelectedPlan.titleTh : currentlySelectedPlan.titleEn} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        onError={(e) => {
                          if (currentlySelectedPlan.fallbackUrl) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = currentlySelectedPlan.fallbackUrl;
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-black/75 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-brand-lime uppercase tracking-widest border border-neutral-800 z-10">
                        {selectedVersion === 'easy' ? (lang === 'TH' ? 'แบบย่อ (Easy)' : 'Easy') : (lang === 'TH' ? 'ตัวเต็ม (Full)' : 'Full')}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="bg-black/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center space-x-1 backdrop-blur-sm pointer-events-none">
                          <ZoomIn className="w-3.5 h-3.5 text-brand-lime" />
                          <span>{lang === 'TH' ? 'คลิกดูท่าเต็ม' : 'Click to zoom'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="space-y-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-lime text-brand-dark font-mono font-bold flex items-center justify-center border border-brand-lime/20 text-sm">
                    {currentlySelectedPlan.id}
                  </span>
                  <h2 className="text-xl font-black tracking-tight text-white">
                    {lang === 'TH' ? currentlySelectedPlan.titleTh : currentlySelectedPlan.titleEn}
                  </h2>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-widest font-mono">
                    {lang === 'TH' ? 'ใช้งานเมื่อ (Use When)' : 'Use When'}
                  </div>
                  <div className="text-xs text-neutral-300 bg-[#161616] p-2.5 rounded-xl leading-relaxed border border-neutral-850">
                    {lang === 'TH' ? currentlySelectedPlan.useWhenTh : currentlySelectedPlan.useWhenEn}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-[#161616] rounded-xl border border-neutral-850">
                    <div className="text-[9px] font-mono tracking-widest font-extrabold text-[#888] uppercase">{lang === 'TH' ? 'เป้าหมายหลัก' : 'Goal'}</div>
                    <div className="text-xs font-bold text-[#E5E5E5] mt-0.5 leading-relaxed">
                      {lang === 'TH' ? currentlySelectedPlan.goalTh : currentlySelectedPlan.goalEn}
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#1D2B16]/20 rounded-xl border border-brand-lime/10">
                    <div className="text-[9px] font-mono tracking-widest font-extrabold text-brand-lime uppercase">{lang === 'TH' ? 'กฎผู้ฝึกสอน' : 'Coach Rule'}</div>
                    <div className="text-xs font-bold text-neutral-300 mt-0.5 leading-relaxed">
                      {lang === 'TH' ? currentlySelectedPlan.coachRuleTh : currentlySelectedPlan.coachRuleEn}
                    </div>
                  </div>
                </div>

                {/* VERSION SPLITTER */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-[#888] uppercase tracking-widest font-mono">
                    {lang === 'TH' ? 'เลือกรุ่นระนาบเวลา' : 'SELECT DURATION/VERSION'}
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-[#161616] p-1 rounded-xl border border-neutral-800">
                    <button
                      onClick={() => {
                        setSelectedVersion('easy');
                        setCompletedExercises([]);
                        setTimerIsActive(false);
                        setTimerSeconds(0);
                        setActiveExerciseIndex(-1);
                        playBeep(700, 0.1);
                      }}
                      className={`py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedVersion === 'easy' 
                          ? 'bg-brand-lime text-brand-dark shadow-sm' 
                          : 'text-[#888] hover:text-white'
                      }`}
                    >
                      <div>{lang === 'TH' ? 'ยุ่ง / ด่วนหลัก' : 'Busy / Easy'}</div>
                      <div className="text-[9px] font-mono opacity-80 uppercase tracking-widest font-bold">10-15 min</div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedVersion('full');
                        setCompletedExercises([]);
                        setTimerIsActive(false);
                        setTimerSeconds(0);
                        setActiveExerciseIndex(-1);
                        playBeep(700, 0.1);
                      }}
                      className={`py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedVersion === 'full' 
                          ? 'bg-brand-lime text-brand-dark shadow-sm' 
                          : 'text-[#888] hover:text-white'
                      }`}
                    >
                      <div>{lang === 'TH' ? 'ฟูล / จัดเต็มสูตร' : 'Full Session'}</div>
                      <div className="text-[9px] font-mono opacity-80 uppercase tracking-widest font-bold">30-60 min</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN & RIGHT COLUMN: EXERCISES LIST & ACTIVE RUNNING COUNTER */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* COUNTDOWN RUNNING PLAYER */}
              {activeExerciseIndex !== -1 && (
                <div className="bg-[#161B12] text-white rounded-2xl p-5 shadow-lg border border-brand-lime/20 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-brand-lime text-brand-dark font-mono text-[9px] font-bold uppercase tracking-widest">
                      ACTIVE TIMER RUNNING
                    </span>
                    <button
                      onClick={() => {
                        setTimerIsActive(false);
                        setTimerSeconds(0);
                        setActiveExerciseIndex(-1);
                        playBeep(500, 0.12);
                      }}
                      className="text-xs text-neutral-400 hover:text-white underline font-mono cursor-pointer"
                    >
                      {lang === 'TH' ? 'ปิดหน้านี้' : 'Exit Timer'}
                    </button>
                  </div>

                  {(() => {
                    const activeExs = selectedVersion === 'easy' ? currentlySelectedPlan.easyExercises : currentlySelectedPlan.fullExercises;
                    const loadedEx = activeExs[activeExerciseIndex];
                    if (!loadedEx) return null;

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
                        <div className="md:col-span-7 space-y-1">
                          <div className="text-xs text-brand-lime uppercase tracking-widest font-mono font-bold">
                            DRILL {activeExerciseIndex + 1} OF {activeExs.length}
                          </div>
                          <h3 className="text-lg font-black text-white tracking-tight">
                            {lang === 'TH' ? loadedEx.nameTh : loadedEx.nameEn}
                          </h3>
                          <p className="text-xs text-neutral-450 font-mono">
                            {lang === 'TH' ? 'เป้าหมายความยาว:' : 'Prescribed Target:'} {lang === 'TH' ? loadedEx.durationOrSetsTh : loadedEx.durationOrSetsEn}
                          </p>
                        </div>

                        {loadedEx.durationSeconds ? (
                          <div className="md:col-span-5 bg-black/40 rounded-xl p-3 border border-neutral-800 flex items-center justify-between space-x-3">
                            <div className="text-center">
                              <div className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">REMAINING</div>
                              <div className="text-3xl font-mono font-bold tracking-tight text-white select-none">
                                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                              </div>
                            </div>

                            <div className="flex items-center space-x-1.5 shrink-0">
                              <button
                                onClick={() => {
                                  setTimerIsActive(!timerIsActive);
                                  playBeep(700, 0.1);
                                }}
                                className={`p-2.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                                  timerIsActive 
                                    ? 'bg-neutral-800 hover:bg-neutral-705 text-white' 
                                    : 'bg-brand-lime text-brand-dark hover:bg-lime-400'
                                }`}
                              >
                                {timerIsActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>

                              <button
                                onClick={() => {
                                  setTimerSeconds(loadedEx.durationSeconds || 60);
                                  setTimerIsActive(false);
                                  playBeep(600, 0.1);
                                }}
                                className="p-2.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition cursor-pointer"
                                title="Reset countdown timer"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="md:col-span-12 text-xs text-neutral-400 leading-relaxed font-mono bg-[#111] p-3 rounded-xl border border-neutral-800">
                            📢 {lang === 'TH' ? 'ท่านี้เน้นฝึกชุดและเซตเป็นหลัก ไม่ต้องกดนับถอยหลังจับเวลา' : 'Set-based routine. Perform the prescribed repetitions and mark complete.'}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* LIST OF EXERCISES DRILLS */}
              <div className="bg-[#121212] rounded-2xl p-5 shadow-xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-brand-lime" />
                    <h3 className="font-extrabold text-base text-white">
                      {lang === 'TH' ? 'ท่าฝึกซ้อมที่ถูกสั่งปรุงแต่งไว้' : 'Prescribed Exercises'} ({selectedVersion === 'easy' ? 'Easy Version' : 'Full Version'})
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono font-bold bg-[#1A1A1A] text-brand-lime px-2.5 py-1 rounded-full uppercase tracking-wider border border-neutral-800 font-bold uppercase tracking-wider">
                    {selectedVersion === 'easy' ? currentlySelectedPlan.easyDurationRange : currentlySelectedPlan.fullDurationRange}
                  </span>
                </div>

                {/* Main DRILLS checklist container */}
                <div className="space-y-2">
                  {(selectedVersion === 'easy' ? currentlySelectedPlan.easyExercises : currentlySelectedPlan.fullExercises).map((ex, index) => {
                    const key = `${selectedPlanId}-${selectedVersion}-${index}`;
                    const isCompleted = completedExercises.includes(key);
                    const isCurrentlyTimerLoaded = activeExerciseIndex === index;

                    return (
                      <div
                        key={index}
                        className={`p-3.5 rounded-xl border text-sm transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                          isCurrentlyTimerLoaded 
                            ? 'border-brand-lime bg-[#1D2B16]/20 ring-1 ring-brand-lime' 
                            : 'border-neutral-850 hover:bg-neutral-800/20 bg-[#161616]'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5 flex-1 select-none">
                          <button
                            onClick={() => toggleExerciseCheck(index)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                              isCompleted 
                                ? 'bg-brand-lime border-brand-lime text-brand-dark font-extrabold shadow-sm' 
                                : 'border-neutral-700 text-transparent hover:border-neutral-500 bg-[#111]'
                            }`}
                          >
                            <Check className="w-4 h-4 text-brand-dark animate-fade-in" />
                          </button>

                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-mono font-bold text-neutral-500">#{index + 1}</span>
                              <h4 className={`font-bold leading-snug tracking-tight ${isCompleted ? 'line-through text-neutral-500 decoration-neutral-700 font-medium text-neutral-500' : 'text-[#E5E5E5] hover:text-white'}`}>
                                {lang === 'TH' ? ex.nameTh : ex.nameEn}
                              </h4>
                            </div>
                            <div className="text-xs text-neutral-400 font-mono">
                              {lang === 'TH' ? 'ระดับความเหนื่อย/ชุด:' : 'Volume guide:'} <span className="font-semibold text-brand-lime">{lang === 'TH' ? ex.durationOrSetsTh : ex.durationOrSetsEn}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                          {ex.durationSeconds && (
                            <button
                              onClick={() => startTimerForExercise(index, ex)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                                isCurrentlyTimerLoaded 
                                  ? 'bg-brand-lime border-brand-lime text-brand-dark shadow' 
                                  : 'bg-[#1e1e1e] border-neutral-850 text-neutral-300 hover:bg-neutral-800'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>{isCurrentlyTimerLoaded ? (lang === 'TH' ? 'กำลังเปิดนับ' : 'Timer Live') : (lang === 'TH' ? 'เปิดจับเวลา' : 'Launch Timer')}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-450 font-mono">
                  <span>
                    {lang === 'TH' ? 'เสร็จเรียบร้อยแล้ว:' : 'Workout Progress:'} {completedExercises.length} / {(selectedVersion === 'easy' ? currentlySelectedPlan.easyExercises : currentlySelectedPlan.fullExercises).length}
                  </span>
                  {completedExercises.length > 0 && (
                    <button
                      onClick={() => {
                        setCompletedExercises([]);
                        setTimerIsActive(false);
                        setActiveExerciseIndex(-1);
                        playBeep(600, 0.15);
                      }}
                      className="text-neutral-500 hover:text-brand-lime flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === 'TH' ? 'รีเซตนับใหม่' : 'Clear Progress'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SAVING THE WORKOUT LOG */}
              <div className="bg-[#121212] rounded-2xl p-5 shadow-xl border border-neutral-800 space-y-4">
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-brand-lime" />
                  <h3 className="font-extrabold text-base text-white">
                    {lang === 'TH' ? 'บันทึกจดสถิติซ้อมเก็บสถิติ' : 'Log Workout Session'}
                  </h3>
                </div>

                <form onSubmit={handleLogWorkout} className="space-y-4">
                  {/* Custom Coach rule requirement warning for Day 9 */}
                  {selectedPlanId === 9 ? (
                    <div className="p-3.5 bg-[#241A0B]/55 rounded-xl border border-[#482F0B] text-amber-200/90 text-xs space-y-1">
                      <div className="font-extrabold text-amber-500 uppercase tracking-wider">⚠️ COACH RULE FOR POST-MATCH COOLDOWN</div>
                      <p>“Write only one main mistake of today. Do not over-analyze.” (โค้ชห้ามเด็ดขาด: เขียนระบายความผิดพลาดสูงสุดเพียงหัวข้อเดียวพอ ห้ามฟุ้งซ่านคิดเยอะเกินไป!)</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-[#161616] rounded-xl border border-neutral-850 text-neutral-400 text-xs">
                      {lang === 'TH' 
                        ? 'จดบันทึกวิเคราะห์สั้นๆ เกี่ยวกับการคอนโทรลหน้าไม้ สภาพขาฟุตเวิร์ก หรือความสำเร็จของวันนี้เพื่อซ่อมแซมรอบหน้า' 
                        : 'Record a brief performance note (e.g., target serving yield, muscle state, paddle angle errors) to track your game evolution.'}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 flex items-center space-x-1 justify-between">
                      <span>{lang === 'TH' ? 'บันทึกหลังซ้อมเสร็จ:' : 'Workout Journal / Errors list:'}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{oneMistakeNote.length} / 150 chars</span>
                    </label>
                    <textarea
                      value={oneMistakeNote}
                      onChange={(e) => setOneMistakeNote(e.target.value.substring(0, 150))}
                      placeholder={
                        selectedPlanId === 9 
                        ? (lang === 'TH' ? 'ผิดพลาดหลักหนึ่งเดียววันนี้คือ...' : 'One main mistake today was...')
                        : (lang === 'TH' ? 'เช่น วันนี้เสิร์ฟดีขึ้น คิชเช่นโฮลนิ่งขึ้น ขาคล่องตัว ฯลฯ' : 'e.g., footwork felt much lighter, wrist control dink yield was 80%')
                      }
                      rows={2}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-850 focus:outline-none focus:ring-2 focus:ring-brand-lime bg-[#161616] text-[#E5E5E5] placeholder-neutral-600 font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-400 font-mono">
                      {lang === 'TH' ? 'ลงวันที่:' : 'Logged on:'} {new Date().toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US')}
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-brand-lime text-brand-dark font-black text-xs rounded-xl shadow-md hover:bg-[#aef163] hover:scale-[1.02] hover:shadow-brand-lime/10 transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'TH' ? 'กดบันทึกเข้าไดอารี่' : 'Add to Journal'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* TAB 3: WEEKLY RHYTHM */}
        {activeTab === 'rhythm' && (
          <div className="space-y-6">
            
            {/* WEEKLY RHYTHM DIRECTIVES */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-5 h-5 text-lime-600" />
                <div>
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    {lang === 'TH' ? 'จัดจังหวะความถี่เซฟตี้ประจำสัปดาห์' : 'Safe Weekly Rhythm Target'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'TH' ? 'คำแนะนำการจัดสมดุลตารางอย่างปลอดภัยจากผู้ฝึกสอนพิกเกิลคอร์ท' : 'Balance skill practice, strength training, and absolute mobility safely.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 space-y-1">
                  <div className="text-xs font-bold text-blue-900 uppercase">2-3 Skill Days</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'TH' ? 'ซ้อมเสิร์ฟ เทคนิคตบ จับหน้าพู่กันนุ่มนวล เคาะกำแพง' : 'Practice serve precision, soft touch adjustments, or dink-height control near a wall.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-1">
                  <div className="text-xs font-bold text-indigo-900 uppercase">1-2 Strength Days</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'TH' ? 'ฟิตกล้ามแผ่นขาพับสะโพก ตึงไหล่ เกร็งแกนต้านหมุนตัวเลี่ยงเจ็บ' : 'Perform core rotation resistance and lunge holds. Support pickleball, dont destroy legs.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/50 space-y-1">
                  <div className="text-xs font-bold text-amber-900 uppercase">2-3 Recovery Days</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'TH' ? 'วันเปิดเหยียดกล้ามเนื้อพักน่อง ฟื้นหัวใจ ผ่อนล้างกรดสะสม' : 'Dedicated stretching, cat-cows, ankle rocks, sleeping well and light recovery walking.'}
                  </p>
                </div>
              </div>

              {/* TOGGLE SELECT MATCH DAYS */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono font-black text-brand-lime">
                      {lang === 'TH' ? 'สลับวันแข่งขันคอร์ทหลักของคุณ' : 'YOUR CORE MATCH WEEK DAYS'}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {lang === 'TH' ? 'คลิกจำลองวันแข่งเพื่อดูคำแนะนำการเว้นวันพักผ่อนที่ปลอดภัยที่ระบบประมวลผลให้' : 'Uncheck or check days to auto-calculate the perfect workout-to-match dynamic template.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setMatchDays(['Wednesday', 'Friday', 'Sunday'])}
                    className="text-[10px] text-brand-lime underline hover:text-white"
                  >
                    {lang === 'TH' ? 'คืนค่ามาตรฐาน พุธ-ศุกร์-อาทิตย์' : 'Reset to Custom default'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {weekdays.map((day) => {
                    const active = matchDays.includes(day.name);
                    return (
                      <button
                        key={day.name}
                        onClick={() => handleToggleMatchDay(day.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 border cursor-pointer ${
                          active 
                            ? 'bg-brand-lime text-slate-950 border-brand-lime font-extrabold' 
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                      >
                        <span>{lang === 'TH' ? day.th : day.name}</span>
                        {active && <Check className="w-3 h-3 text-slate-950 font-black" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* GENERATED SCHEDULE DISPLAY */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-slate-800" />
                <h3 className="font-extrabold text-base text-slate-950">
                  {lang === 'TH' ? 'รูปแบบตารางที่แนะนำตามสภาพแวดล้อมสัปดาห์ตัวคุณ:' : 'Customized Weekly Fitness Template:'}
                </h3>
              </div>

              {matchDays.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs space-y-1 font-mono">
                  <div>📢 {lang === 'TH' ? 'เลือกวันลงสนามแข่งสักนิด เพื่อให้โค้ชคำนวณสัปดาห์ที่ลงตัวให้!' : 'Log your core match/play days to trigger customized weekly schedule calculation.'}</div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {weekdays.map((day) => {
                    const isMatchValue = matchDays.includes(day.name);
                    const advice = getWeekAdvice(day.name);

                    return (
                      <div
                        key={day.name}
                        className={`p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-2.5 transition-all ${
                          isMatchValue 
                            ? 'bg-emerald-50/40 border-emerald-100 ring-1 ring-emerald-200' 
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-20 font-bold text-xs uppercase px-2 py-1 rounded text-center tracking-wide font-mono ${
                            isMatchValue 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {lang === 'TH' ? day.th : day.name}
                          </span>

                          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                            isMatchValue 
                              ? 'bg-emerald-100 text-emerald-950 border border-emerald-200' 
                              : day.name === 'Monday' || day.name === 'Saturday' ? 'bg-amber-100 text-amber-950' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {isMatchValue ? (lang === 'TH' ? 'วันลงแข่งจริง' : 'MATCH PLAY') : (lang === 'TH' ? 'วันซ้อมเสริม' : 'ROUTINE')}
                          </span>
                        </div>

                        <div className={advice.bgColor}>
                          {lang === 'TH' ? advice.labelTH : advice.labelEN}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* WEEKLY PRINCIPLE QUOTIENT */}
              <div className="p-4 bg-slate-50 rounded-xl text-slate-700 space-y-1.5 border border-slate-200/50">
                <div className="text-xs font-extrabold text-slate-900 uppercase">
                  {lang === 'TH' ? 'หลักการของโค้ชพิกเกิลบอล:' : 'Coach Pro Principle:'}
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {lang === 'TH' 
                    ? '“อย่าพยายามสรรหาท่าออกกำลังเพิ่มยัดเข้าไปมากมาย เพียงเพื่ออยากรู้สึกเหนื่อยใจหาย ให้เลือกหยิบทำเซตท่าเฉพาะที่เข้าไปทำลายคอขวดสะดุดของฝีมือคุณในวันนี้เท่านั้น!”'
                    : '“Do not add more exercises just to feel like you broke a sweat. Pick the specific routine that breaks today\'s bottleneck and preserves knee/shoulder longevity.”'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TRAINING DIARY / JOURNAL */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            
            {/* LOG HIGHLIGHT STATS */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-5 h-5 text-lime-600 animate-bounce" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">
                      {lang === 'TH' ? 'สมุดบันทึกสรุปผลงานระดับส่วนตัว' : 'My Court Journal & History'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {lang === 'TH' ? 'บันทึกความล้าและวิถีการแก้ไขข้อบกพร่องข้อดีของร่างกาย' : 'Trace your pickleball routine progress and errors log over time.'}
                    </p>
                  </div>
                </div>

                {historyLogs.length > 0 && (
                  <button
                    onClick={handleClearAllLogs}
                    className="text-xs font-bold text-red-600 hover:text-red-800 transition flex items-center space-x-1 px-3 py-1.5 bg-red-50 hover:bg-red-100/50 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'TH' ? 'ล้างประวัติทั้งหมด' : 'Clear All Logs'}</span>
                  </button>
                )}
              </div>

              {historyLogs.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-3.5 border border-dashed border-slate-200 rounded-2xl">
                  <Inbox className="w-8 h-8 mx-auto text-slate-300" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-600">
                      {lang === 'TH' ? 'ยังคงไม่มีบันทึกประวัติการซ้อมในระบบ' : 'Your Training Journal is empty.'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'TH' ? 'ทำตามแผนซ้อมแล้วกดเสร็จสิ้นพร้อมป้อนข้อมูลเพื่อเก็บเป็นบันทึกฟอร์มสถิติ' : 'After running a drill, click "Add to Journal" in the Coach tab to log your mistakes.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlanId(1);
                      setActiveTab('coach');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-brand-lime rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-1"
                  >
                    <span>{lang === 'TH' ? 'ไปฝึกซ้อมเดี๋ยวนี้' : 'Start First Session'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-1 border-b border-slate-100">
                    <span>{lang === 'TH' ? 'ความพยายามรวมทั้งหมด:' : 'Total recorded sessions:'} <span className="font-bold text-slate-800">{historyLogs.length}</span></span>
                    <span>{lang === 'TH' ? 'บันทึกในอุปกรณ์ปัจจุบัน' : 'Saved locally in localStorage'}</span>
                  </div>

                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                    {historyLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-300 transition-all"
                      >
                        <div className="space-y-1.5 flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="bg-slate-900 text-brand-lime font-black px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider">
                              {log.version === 'easy' ? 'Busy / Easy' : 'Full Version'}
                            </span>
                            <span className="text-slate-400 font-mono text-[10px]">
                              {new Date(log.date).toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US')} {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-extrabold text-slate-900 text-sm">
                              {log.sessionTitle}
                            </h4>
                            <p className="text-xs text-slate-600 bg-white p-2 border border-slate-100 rounded-lg font-sans leading-relaxed">
                              {log.notes}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveLog(log.id)}
                          className="text-slate-400 hover:text-red-700 p-1.5 shrink-0 self-end sm:self-auto hover:bg-slate-100 rounded-lg transition"
                          title="Remove from journal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ZOOMABLE IMAGE MODAL OVERLAY */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 md:p-6 select-none"
            tabIndex={0}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 shrink-0 bg-neutral-900/60 p-3 rounded-xl backdrop-blur-sm border border-neutral-800">
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-mono font-bold tracking-widest text-brand-lime uppercase">
                  {lang === 'TH' ? 'โหมดขยายดูรูปภาพท่าซ้อม' : 'POSE SPECTATOR ZOOM'}
                </span>
                <h3 className="text-white font-extrabold text-xs md:text-sm tracking-tight truncate max-w-[200px] sm:max-w-md">
                  {zoomImg.title}
                </h3>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-1.5 md:space-x-2 shrink-0">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {Math.round(zoomScale * 100)}%
                </span>
                
                <button
                  onClick={() => {
                    const next = Math.max(1, zoomScale - 0.25);
                    setZoomScale(next);
                    if (next <= 1) setZoomOffset({ x: 0, y: 0 });
                  }}
                  disabled={zoomScale <= 1}
                  className="p-1.5 md:p-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-white rounded-lg transition border border-neutral-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => {
                    setZoomScale(prev => Math.min(4, prev + 0.25));
                  }}
                  disabled={zoomScale >= 4}
                  className="p-1.5 md:p-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-white rounded-lg transition border border-neutral-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setZoomScale(1);
                    setZoomOffset({ x: 0, y: 0 });
                  }}
                  className="px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-brand-lime rounded-lg transition border border-neutral-700"
                >
                  {lang === 'TH' ? 'รีเซ็ต' : 'Reset'}
                </button>

                <button
                  onClick={() => setZoomImg(null)}
                  className="p-1.5 md:p-2 bg-red-950/40 hover:bg-red-900 text-red-400 rounded-lg transition border border-red-900/50"
                  title="Close Media Viewer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Interactive Image Container Area */}
            <div 
              className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden my-4 relative rounded-2xl bg-neutral-950/60 border border-neutral-900 cursor-grab active:cursor-grabbing"
              onMouseDown={(e) => handlePanStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handlePanMove(e.clientX, e.clientY)}
              onMouseUp={handlePanEnd}
              onMouseLeave={handlePanEnd}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={handlePanEnd}
              onDoubleClick={toggleZoomScale}
            >
              <div 
                className="w-full h-full max-w-sm aspect-[3/4] transition-transform duration-75 ease-out select-none"
                style={{
                  transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`,
                  transformOrigin: 'center center',
                }}
              >
                <img 
                  src={zoomImg.url} 
                  alt={zoomImg.title} 
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float guide overlay */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-1.5 rounded-full text-[10px] text-neutral-400 font-mono tracking-wide border border-neutral-800 pointer-events-none text-center whitespace-nowrap">
                {zoomScale > 1 ? (
                  lang === 'TH' ? 'คลิกลากเพื่อเลื่อนดูส่วนอื่นๆ • ดับเบิ้ลคลิกเพื่อรีเซ็ต' : 'Drag to pan • Double-click to reset'
                ) : (
                  lang === 'TH' ? 'ดับเบิ้ลคลิกเพื่อขยาย • ปัดหรือลากเมื่อขยาย' : 'Double-click to zoom • Use controls above or drag when zoomed'
                )}
              </div>
            </div>

            {/* Bottom metadata panel */}
            <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[10px] text-neutral-500 font-mono">
              <span>{lang === 'TH' ? 'กด ESC หรือปุ่มสีแดงเพื่อปิดได้ทุกเมื่อ' : 'Press ESC or Click Close Button to Exit'}</span>
              <span>100% Seamless Interactive Spectator View</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER - CLEAN DESKTOP AND MOBILE ACCENTS */}
      <footer className="bg-brand-dark text-slate-400 border-t border-slate-800 py-6 mt-12 text-xs">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3.5">
          <div className="flex items-center justify-center space-x-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
            <span className="font-extrabold uppercase tracking-widest font-mono text-[10px] text-slate-300">
              PICKLEBALL PERFORMANCE ALIGNMENT ENGINE
            </span>
          </div>
          
          <p className="max-w-md mx-auto text-slate-400 leading-normal text-[11px]">
            {lang === 'TH' 
              ? 'ออกแบบมาสำหรับอุปกรณ์สมาร์ทโฟนโดยเฉพาะ เพื่อส่งมอบคุณค่าการฝึกอบรมที่ยืดหยุ่น ยืดเหยียด และซ้อมเคาะน็อกบอร์ดอย่างมั่นคง ป้องกันเอ็นเข่าสะโพกอักเสบ'
              : 'Engineered specifically for cellular viewports to assist consistent dink touch mastery, hip opener routines and preventative strength.'}
          </p>

          <div className="text-[10px] text-slate-500 font-mono">
            &copy; 100% Client-Side Stateful Pickleball Guide. All data stored securely in browser cache.
          </div>
        </div>
      </footer>
    </div>
  );
}
