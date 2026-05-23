import { SessionPlan } from './types';

export const sessionPlans: SessionPlan[] = [
  {
    id: 1,
    slug: 'stretch-recovery',
    titleEn: '1. STRETCH / RECOVERY DAY',
    titleTh: '1. วันยืดกล้ามเนื้อและฟื้นฟูร่างกาย',
    useWhenEn: 'Tired legs, stiff hips, sore calves, after match day, bad sleep, or when you should move but not train.',
    useWhenTh: 'ขาอ่อนล้า, สะโพกตึงมาริโอ้, น่องระบม, หลังวันแข่งข้น, นอนน้อย หรือเมื่อต้องการขยับร่างกายแต่ไม่ควรซ้อมหนัก',
    goalEn: 'Feel looser, not more tired.',
    goalTh: 'ผ่อนคลายกล้ามเนื้อ ไม่เพิ่มความเหนื่อยล้าให้กับร่างกาย',
    coachRuleEn: 'This is not a workout. If you sweat hard, you overdid it.',
    coachRuleTh: 'นี่ไม่ใช่การออกกำลังกายลดน้ำหนัก ถ้ารู้สึกเหงื่อท่วมหนัก แสดงว่าคุณขยับหักโหมเกินไปแล้ว',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'Cat-cow', nameTh: 'โยคะท่าแมวและวัว (Cat-cow)', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: "World's greatest stretch", nameTh: 'ท่ายืดกล้ามเนื้อที่เยี่ยมที่สุดในโลก (World\'s Greatest Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hip flexor stretch', nameTh: 'ยืดกล้ามเนื้อสะโพกแบบก้าวขาหน้า (Hip Flexor Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hamstring stretch', nameTh: 'ยืดกล้ามเนื้อต้นขาด้านหลัง (Hamstring Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Ankle rocks', nameTh: 'โยกกดข้อยึดข้อเท้า (Ankle Rocks)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Wrist + forearm stretch', nameTh: 'ยืดข้อมือและท้องแขน (Wrist + Forearm Stretch)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Breathing cooldown', nameTh: 'หายใจผ่อนคลายสมาธิและหัวใจ (Breathing Cooldown)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 }
    ],
    fullDurationRange: '30-45 Min',
    fullExercises: [
      { nameEn: 'Cat-cow', nameTh: 'โยคะท่าแมวและวัว (Cat-cow)', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: "World's greatest stretch", nameTh: 'ท่ายืดกล้ามเนื้อที่เยี่ยมที่สุดในโลก (World\'s Greatest Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hip flexor stretch', nameTh: 'ยืดกล้ามเนื้อสะโพกแบบก้าวขาหน้า (Hip Flexor Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hamstring stretch', nameTh: 'ยืดกล้ามเนื้อต้นขาด้านหลัง (Hamstring Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Ankle rocks', nameTh: 'โยกกดข้อยึดข้อเท้า (Ankle Rocks)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Wrist + forearm stretch', nameTh: 'ยืดข้อมือและท้องแขน (Wrist + Forearm Stretch)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Thoracic rotation', nameTh: 'บิดเปิดกระดูกสันหลังส่วนอก (Thoracic Rotation)', durationOrSetsEn: '2-3 min', durationOrSetsTh: '2-3 นาที', durationSeconds: 150 },
      { nameEn: 'Band external rotation', nameTh: 'หมุนกระชับหัวไหล่ด้วยยางยืด (Band External Rotation)', durationOrSetsEn: '2 x 12', durationOrSetsTh: '2 เซต เซตละ 12 ครั้ง' },
      { nameEn: 'Scapular push-up', nameTh: 'วิดพื้นดันสะบัก (Scapular Push-up)', durationOrSetsEn: '2 x 10', durationOrSetsTh: '2 เซต เซตละ 10 ครั้ง' },
      { nameEn: 'Figure-4 glute stretch', nameTh: 'ยืดสะโพกรูปเลข 4 (Figure-4 Glute Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Calf stretch', nameTh: 'ยืดกล้ามเนื้อน่องกับกำแพง (Calf Stretch)', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Light walk', nameTh: 'เดินเบาๆ ผ่อนคลายกล้ามเนื้อขา (Light Walk)', durationOrSetsEn: '10-15 min', durationOrSetsTh: '10-15 นาที', durationSeconds: 600 },
      { nameEn: 'Breathing cooldown', nameTh: 'หายใจผ่อนคลายสมาธิและหัวใจ (Breathing Cooldown)', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-1.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1607962837359-5e7e89f866fe?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/QdPtk6rk/Chat-GPT-Image-May-21-2026-01-09-24-PM.png',
    fullImageUrl: 'https://i.postimg.cc/fb9bHxwt/Chat-GPT-Image-May-21-2026-01-11-44-PM.png'
  },
  {
    id: 2,
    slug: 'footwork-day',
    titleEn: '2. FOOTWORK DAY',
    titleTh: '2. วันฝึกฟูตเวิร์กและการวางเท้า',
    useWhenEn: 'You feel late to the ball, heavy-footed, stuck upright, or slow to recover after shots.',
    useWhenTh: 'เมื่อรู้สึกไปถึงลูกช้า ร่างกายทื่อ ตึงตัว ลอยยืนจ้อง หรือซ่อมแซมท่ากลับตัวรับลูกไม่ทัน',
    goalEn: 'Clean stop-start movement.',
    goalTh: 'การเริ่มต้นและหยุดเตลื่อนไหวอย่างมั่นคงคมชัด',
    coachRuleEn: 'No jumping. No HIIT. Quiet feet, stable body.',
    coachRuleTh: 'ห้ามกระโดดโลดเต้นเหมือนคาร์ดิโอความเข้มข้นสูง ลากเท้าแตะเบียบเงียบ ตัวนิ่งและเสถียร',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'Ready position reset', nameTh: 'เตรียมความพร้อมตั้งท่าเซตร่างกาย', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Split step timing', nameTh: 'จังหวะกระโดดขยับเท้าแยกเตรียมสปริงตัว (Split Step)', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Side shuffle + stop balance', nameTh: 'ก้าวสไลด์ข้างและพักทรงตัวหยุด (Side Shuffle + Stop)', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Forward to kitchen + recover', nameTh: 'เคลื่อนที่พุ่งไปเส้นหน้าเน็ต (Kitchen) และดันถอยหลังกลับ', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Single-leg balance paddle hold', nameTh: 'ทรงตัวขาเดียวพร้อมจับไม้เตรียมพร้อมทรงตัว', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 }
    ],
    fullDurationRange: '30-45 Min',
    fullExercises: [
      { nameEn: 'Ready position reset', nameTh: 'เตรียมความพร้อมตั้งท่าเซตร่างกาย', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Split step timing', nameTh: 'จังหวะขยับเท้าแยกสปริงตัวเตรียมการ (Split Step)', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Side shuffle + stop balance', nameTh: 'ก้าวสไลด์ข้างและซ้อมจัดระเบียบตัวทรงตัวหยุด', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Forward to kitchen + recover', nameTh: 'เคลื่อนตัวแดชไปข้างหน้าและเดินถอยหลังกลับมาสแตนบาย', durationOrSetsEn: '8 min', durationOrSetsTh: '8 นาที', durationSeconds: 480 },
      { nameEn: 'Backhand-side movement', nameTh: 'ซ้อมสับฝีเท้าเข้าหาลูกฝั่งแบคแฮนด์ด้านหลัง', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Kitchen line in-out movement', nameTh: 'ขยับเท้าก้าวเข้า-ออกหน้าเส้นครัวอย่างรวดเร็ว', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Cooldown ankle/hip', nameTh: 'คูลดาวน์กล้ามเนื้อส่วนข้อยืดข้อเท้าและสะโพก', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-2.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/fRFLjHhZ/Chat-GPT-Image-May-21-2026-01-13-07-PM.png',
    fullImageUrl: 'https://i.postimg.cc/QdPtk6r7/Chat-GPT-Image-May-21-2026-01-16-38-PM.png'
  },
  {
    id: 3,
    slug: 'strength-day',
    titleEn: '3. STRENGTH DAY',
    titleTh: '3. วันเสริมความแข็งแกร่งและสมดุล',
    useWhenEn: 'Body feels fresh, no match within 24 hours, and you want stronger legs/core for stability.',
    useWhenTh: 'เมื่อร่างกายรู้สึกสดชื่น ไม่มีนัดแข่งขันภายใน 24 ชั่วโมง และกำลังเสริมพลังกล้ามเนื้อแกนกลางรวมถึงขา',
    goalEn: 'Support pickleball, not destroy legs.',
    goalTh: 'ช่วยประคองระบบการเล่นพิคเคิลบอล ไม่ใช่ฝืนจนกล้ามขาพังสะบักสะบอม',
    coachRuleEn: 'Keep RPE 6-7/10. Before match-heavy weekends, reduce lunges.',
    coachRuleTh: 'ควบคุมระดับความเหนื่อยให้อยู่ที่ 6-7 เต็ม 10. ถ้าจะแข่งในช่วงวันหยุดสุดสัปดาห์นี้ ให้ลดยอดลงตัวย่อขาหรือ Lunge ลง',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'TRX Squat', nameTh: 'ซ้อมหัวเคาะลุกนั่งพยุงสายเกาะ (TRX Squat)', durationOrSetsEn: '2 x 10', durationOrSetsTh: '2 เซต เซตละ 10 ครั้ง' },
      { nameEn: 'TRX Row', nameTh: 'ซ้อมโหนสลิงดึงหลังกระชับแนวคอ (TRX Row)', durationOrSetsEn: '2 x 8-10', durationOrSetsTh: '2 เซต เซตละ 8-10 ครั้ง' },
      { nameEn: 'TRX Hip Hinge / Assisted RDL', nameTh: 'พับสะโพกพยุงตัวสร้างความมั่นคงขาหลัง', durationOrSetsEn: '2 x 10', durationOrSetsTh: '2 เซต เซตละ 10 ครั้ง' },
      { nameEn: 'TRX Anti-Rotation Hold', nameTh: 'เกร็งกล้ามเนื้อต้านแรงหมุนหน้าท้องสลับซ้ายขวา', durationOrSetsEn: '2 x 20 sec each side', durationOrSetsTh: '2 เซต ค้างไว้ข้างละ 20 วินาที', durationSeconds: 40 },
      { nameEn: 'TRX Calf Raise', nameTh: 'ซ้อมยกล้อเท้านาบรุกน่องกระชับแกนหลัก', durationOrSetsEn: '1-2 x 12', durationOrSetsTh: '1-2 เซต เซตละ 12 ครั้ง' }
    ],
    fullDurationRange: '30-45 Min',
    fullExercises: [
      { nameEn: 'TRX Squat', nameTh: 'ซ้อมรุกนั่งลีนสายเกาะสร้างมวลกล้าม (TRX Squat)', durationOrSetsEn: '3 x 12', durationOrSetsTh: '3 เซต เซตละ 12 ครั้ง' },
      { nameEn: 'TRX Row', nameTh: 'ดึงบ่าโหนยืดสายหลังไหล่อมบ่า (TRX Row)', durationOrSetsEn: '3 x 10', durationOrSetsTh: '3 เซต เซตละ 10 ครั้ง' },
      { nameEn: 'TRX Reverse Lunge', nameTh: 'ก้าวถอยหลังพับย่อเข่าขาเหลี่ยมซ้ายขวาพูนสะโพก', durationOrSetsEn: '2 x 8 each side', durationOrSetsTh: '2 เซต ข้างละ 8 ครั้ง' },
      { nameEn: 'TRX Hip Hinge / Assisted RDL', nameTh: 'พับยืดแนวสะโพกพยุงน้ำหนักตึงขาหลังสะโพก', durationOrSetsEn: '3 x 10', durationOrSetsTh: '3 เซต เซตละ 10 ครั้ง' },
      { nameEn: 'TRX Anti-Rotation Hold', nameTh: 'ปั้นความแข็งแกร่งกล้ามแกนเกร็งต้านมุมข้างลึก', durationOrSetsEn: '2 x 20-30 sec each side', durationOrSetsTh: '2 เซต ข้างละ 20-30 วินาที', durationSeconds: 60 },
      { nameEn: 'TRX Calf Raise', nameTh: 'ยกส้นเบ่งเกร็งน่องให้ทรงตัวดีทนแรงปะทะ', durationOrSetsEn: '2 x 15', durationOrSetsTh: '2 เซต เซตละ 15 ครั้ง' },
      { nameEn: 'Optional TRX Chest Press', nameTh: 'ตัวเลือกเสริม: ดันขยายหน้าอกแผ่นบ่าพยุงตัวส่งพลัง (ทำเฉพาะตอนกล้ามยังสดชื่น)', durationOrSetsEn: '2 x 8-10 only if fresh', durationOrSetsTh: '2 เซต เซตละ 8-10 ครั้ง เมื่อกล้ามเนื้อแรงดี' }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-3.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/DwDZdCK4/Chat-GPT-Image-May-21-2026-01-18-29-PM.png',
    fullImageUrl: 'https://i.postimg.cc/cJnJDQxq/Chat-GPT-Image-May-21-2026-12-23-44-PM.png'
  },
  {
    id: 4,
    slug: 'fix-position',
    titleEn: '4. FIX POSITION DAY',
    titleTh: '4. วันรีเซตตำแหน่งและจัดระเบียบตัว',
    useWhenEn: 'You stand upright, admire your shot, forget to reset, or feel rushed during rallies.',
    useWhenTh: 'เมื่อย้อยตัวยืนจ้องผลงานตัวเอง ลืมกลับมาตั้งไม้พร้อมเล่น หรือตระหนกว้าวุ่นเมื่อเกมไวปะทะหน้าเน็ต',
    goalEn: 'After every shot, paddle returns to front.',
    goalTh: 'ทุกครั้งหลังหวดลูกเสร็จ ไม้พิกเกิลต้องดีดกลับมารอจุดกึ่งกลางด้านหน้าเสมอ',
    coachRuleEn: 'Judge success by reset quality, not speed.',
    coachRuleTh: 'ประเมินความสำเร็จของวันนี้ด้วยความเป๊ะรอบคอบของรีเซตไม้ ไม่ใช่ความบ้าบิ่นรวดเร็วลวกๆ',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'Ready position hold', nameTh: 'ค้างตึงเกร็งท่ายืนพร้อมรับมือที่ถูกต้อง', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Shadow hit -> reset', nameTh: 'จำลองการตีลมเสมือนจริงแล้วดีดไม้กลับเซตตริกสะโพก', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Split step -> paddle in front', nameTh: 'สับเท้าปึ้งลงพร้อมตั้งเป้ากวาดไม้ข้างหน้าเสถียร', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Side shuffle 2 steps -> stop -> reset', nameTh: 'สไลด์ข้างสองจังหวะแล้วปักเป็กกลับคืนท่าพร้อมด่วน', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Forehand shadow -> recover center', nameTh: 'หวดจำลองโฟร์แฮนด์พุ่งดันแล้วรีเซตจุดกลางรวดเร็ว', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Backhand shadow -> recover center', nameTh: 'หวดจำลองแบคแฮนด์ถอยดึงแล้วตั้งท่ากล่อมกลางลูก', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 }
    ],
    fullDurationRange: '30-45 Min',
    fullExercises: [
      { nameEn: 'Ready position reset', nameTh: 'การเตรียมจัดชุดฟอร์มท่าตั้งหลัก', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Shadow forehand -> reset', nameTh: 'จำลองโมเมนตัมหวดโฟร์แฮนด์แล้วยั้งรีเซตตั้งหัวไม้', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Shadow backhand -> reset', nameTh: 'จำลองย่อมุมแบคแฮนด์งัดกลับสะโพกปักหลังตรง', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Split step timing', nameTh: 'ฝึกการตอบสนองจับจังหวะสับสปริงตัวให้สอดคล้องกัน', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Kitchen approach -> stop -> ready', nameTh: 'จำลองสไลด์พุ่งหน้าเข้าหาครัวหยุดนิ่งแล้วเตรียมปักหลัก', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Backhand-side recovery', nameTh: 'ขยับปาดเบี่ยงเอียงตัวกวาดจากมุมแบคแฮนด์เสริฟไว', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Mini test: 20 shadow shots, reset after every one', nameTh: 'มินิเทสต์: ทดลองหวดลม 20 ตบ ต่อเนื่อง โดยต้องดีเซตรีบล้านรอบไม้มานิ่งสนิทหน้าตัวทุกลูกอย่างชัดเจน', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-4.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1626245917164-116492bf93f2?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/tgxgrhXK/Chat-GPT-Image-May-21-2026-12-25-45-PM.png',
    fullImageUrl: 'https://i.postimg.cc/6QvQHd9g/Chat-GPT-Image-May-21-2026-12-30-45-PM.png'
  },
  {
    id: 5,
    slug: 'serve-return',
    titleEn: '5. SERVE + RETURN DAY',
    titleTh: '5. วันฝึกเทคนิคการเสิร์ฟและการรีเทิร์นกลับ',
    useWhenEn: 'You miss serves, serve too weak, return too short, or give free points.',
    useWhenTh: 'เมื่อคุณทำลูกออกเองง่ายๆ เสิร์ฟวิถีเฉื่อยแฉะ หรือกระดอนโยนคืนหน้าสั้นแถมแจกแต้มให้อีกฝ่ายฟรี',
    goalEn: 'Smooth, repeatable motion.',
    goalTh: 'การเคลื่อนเป้าสวิงลื่นไหล ทำซ้ำได้เป๊ะตลอดเกมไม่หลุดสมาธิ',
    coachRuleEn: 'Boring serve is good. Free points against yourself are expensive.',
    coachRuleTh: 'ลูกเสิร์ฟแนวราบรื่นสุดจืดชืดนี่แหละคือเสิร์ฟที่ดี การทำเสียแจกแต้มให้คู่แข่งคืออะไรที่แพงเกินจ่ายไหว!',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'Serve shadow', nameTh: 'วิดสวิงจำลองวงท่าสะบัดเสิร์ฟไม่ใช้ลูกบอล', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Drop serve mechanics', nameTh: 'ฝึกคีย์จลนศาสตร์การปล่อยทิ้งตกกระทบตีจุดตบเสิร์ฟ', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Target serve practice or dry serve motion', nameTh: 'มาร์กซ้อมจัดวิถีเสิร์ฟตรงเป้าหรือสวมเป้าตีลูกเซ็ตลม', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Finish: 10 calm serve motions', nameTh: 'รอบปิดท้าย: ซ้อมวางวิถีเสิร์ฟควบคุมสติ 10 ครั้งแบบละเมียดละไม', durationOrSetsEn: '10 calm motions', durationOrSetsTh: 'ซ้อมสวิงราบนิ่ง 10 ครั้ง' }
    ],
    fullDurationRange: '30-60 Min',
    fullExercises: [
      { nameEn: 'Warm-up shoulder/wrist', nameTh: 'อบอุ่นร่างกายสลายตึงส่วนข้อพับข้อมือและบ่าหัวไหล่', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Serve shadow', nameTh: 'ซ้อมจัดปรับโครงท่าทางไหล่ป้อปลูกเสิร์ฟไร้ลมไม้', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Drop serve mechanics', nameTh: 'วิเคราะห์แก้ไขความนูนเอียงของไม้ตอนปล่อยดรอปตีลูก', durationOrSetsEn: '10 min', durationOrSetsTh: '10 นาที', durationSeconds: 600 },
      { nameEn: 'Serve to target', nameTh: 'เสิร์ฟสลับเจาะจงเป้าตารางฝั่งโน้น (กระหน่ำตี 20-30 ครั้งแบบคุมกล้ามเนื้อ)', durationOrSetsEn: '20-30 serves', durationOrSetsTh: 'ซ้อมตีเสิร์ฟจริงลงเป้าสลับ 20-30 ลูก' },
      { nameEn: 'Return-depth practice (if you have partner/wall/court)', nameTh: 'ฝึกการหวดรีเทิร์นลึกยัดหลัง (ถ้าซ้อมสลับปะทะกำแพงหรือเล่นกับคู่ซ้อม)', durationOrSetsEn: '10-15 min', durationOrSetsTh: '10-15 นาที', durationSeconds: 600 },
      { nameEn: 'Record: serves attempted / serves in / main miss', nameTh: 'บันทึกจดสถิติหลังซ้อมเสร็จ: ลิสต์ยอดเสิร์ฟประคองตัว / ตีเป้าในตัว / นอกตัว', durationOrSetsEn: 'Self-assessment', durationOrSetsTh: 'ประเมินเก็บวิถีความพลาดหลักของตัว' }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-5.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/XvCv2wVh/Chat-GPT-Image-May-21-2026-12-47-16-PM.png',
    fullImageUrl: 'https://i.postimg.cc/XvCv2wVD/Chat-GPT-Image-May-21-2026-12-49-45-PM.png'
  },
  {
    id: 6,
    slug: 'soft-hands',
    titleEn: '6. SOFT HANDS / TOUCH DAY',
    titleTh: '6. วันเทรนนิ่งมือสัมผัสเบาและคุมน้ำหนักบอล',
    useWhenEn: 'You overhit, panic near the kitchen, pop up balls, or lose control when rushed.',
    useWhenTh: 'เมื่อรู้สึกว่าออกแรงหวดเยอะไป ทำตัวตื่นเต้นระแวงล้นสติแถวมุมครัว บอลตกทิ่มสะท้อนลอยพุ่งให้ถูกตบง่ายๆ',
    goalEn: 'Reduce grip tension.',
    goalTh: 'ลดระดับความแน่นเกร็งนิ้วฝ่ามือลง (ผ่อนน้ำหนักนิ้วตระหนักนิ่ง)',
    coachRuleEn: 'Soft grip. Less wrist. Contact in front.',
    coachRuleTh: 'จับไม้หลวมๆ พอดีตัว ลดการบิดหรือขยิกข้อมือลง สลัดปะทะหน้าพู่กันหน้าลำตัว',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'Forehand paddle bounce', nameTh: 'หงายหน้าไม้เคาะลูกเด้งขึ้นนิ่งๆ โฟร์แฮนด์ลอยสม่ำเสมอ', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Backhand paddle bounce', nameTh: 'คว่ำหน้าหลังไม้เคาะลูกเบากระดอนแนวตรงแบคแฮนด์แบบคุมมือ', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Alternate forehand/backhand bounce', nameTh: 'สลับข้างเคาะบอลดอนดึงโฟร์-แบคควบคุมจังหวะหัวไม้', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Soft hand catch-bounce', nameTh: 'ฝึกแตะลูกสัมผัสซับแรงกระดอนนุ่ม ค่อยๆประคองวางสลับรับตัว', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Dink shadow with ball drop', nameTh: 'จำลองสวิงปัดดิงก์งัดตบสั้นพยุงทิศจับจังหวะดร็อปข้างหน้าตัว', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 }
    ],
    fullDurationRange: '30-45 Min',
    fullExercises: [
      { nameEn: 'Forehand paddle bounce', nameTh: 'ประคองนิ่งโยกแรคเกตเคาะวิถีขึ้นโฟร์แฮนด์กระดอนสม่ำเสมอ', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Backhand paddle bounce', nameTh: 'ฝึกลอยสไลด์ลากไม้ประคองแบคแฮนด์สะท้อนแนวดังนิ่มๆ', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Alternate bounce', nameTh: 'สลับสบัดตีไขว้หัวใจนุ่มนวลโยกดอนดรอปต่อเนื่องสติจดจ่อ', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Soft hand catch-bounce', nameTh: 'ซ้อมซับซับและโผงแรงพยักไม้กวาดลูกละเมียดสัมผัสละโมบ', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Dink shadow with ball drop', nameTh: 'ซ้อมโมเมนต์ทิ่มฉากดิงก์พริ้วยกแนวต่ำจำลองหล่นใส่กำแพงเคลิ้ม', durationOrSetsEn: '8 min', durationOrSetsTh: '8 นาที', durationSeconds: 480 },
      { nameEn: 'Dink-height control near wall', nameTh: 'เคาะหยอดดิงก์พยักหน้าไม้ควบคุมระนาบต่ำผ่านเกณฑ์เป้าปักกำแพง', durationOrSetsEn: '10 min', durationOrSetsTh: '10 นาที', durationSeconds: 600 },
      { nameEn: 'Wrist/shoulder reset', nameTh: 'ยืดเหยียดผ่อนคลายข้อหมุนนิ้วกระดูกข้อมือไหล่ส่งความสดชดพยักไม้', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-6.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1511200988065-2563d76e594c?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/CKqKvjFc/Chat-GPT-Image-May-21-2026-12-51-22-PM.png',
    fullImageUrl: 'https://i.postimg.cc/q737m8kj/Chat-GPT-Image-May-21-2026-12-53-00-PM.png'
  },
  {
    id: 7,
    slug: 'wall-drill',
    titleEn: '7. WALL DRILL DAY',
    titleTh: '7. วันซ้อมเคาะน็อกรอบบอร์ดกับกำแพงบ้าน',
    useWhenEn: 'You want paddle reps but cannot go to court.',
    useWhenTh: 'เมื่อกระหายอยากคุมไม้เรียกฟอร์มสัมผัสบอลเก็บจำนวนครั้ง แรปกระชับ แต่ติดข้อจำกัดไม่มีสิทธิ์เข้าสนามจริง',
    goalEn: 'Clean contact, not rally count.',
    goalTh: 'เน้นกระแทกลูกสัมผัสเข้ากลางหน้าค้างเป้าไม้ให้สวยคมกริบ ไม่สำคัญว่าจะต้องสู้ยื้อจนไม้แทบพังสะสมวิถีสะบัด',
    coachRuleEn: 'Stop when form breaks. Do not practice ugly reps.',
    coachRuleTh: 'จงรีบสลัดหยุดซ้อมทันทีถ้ารูปทรงและฟอร์มแกนหลักคุณเริ่มเสียทรง อย่าปล่อยตัวฝึกท่าบิดเบี้ยวฝังความเคยชินแย่ๆ เข้าก้านสมองเด็ดขาด',
    easyDurationRange: '10-15 Min',
    easyExercises: [
      { nameEn: 'No-ball shadow swing near wall', nameTh: 'จำลองสวิงขัดเงาเรียบใบขัดใกล้ระยะแนวหน้าด่านตบ', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Drop-hit forehand, hit once then catch', nameTh: 'ปล่อยเดาะตกร่องหวดตีโฟร์แฮนด์กระทบลอยกระดอนทีนึงแล้วรีบรับค้างจับลูก', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Drop-hit backhand, hit once then catch', nameTh: 'ปล่อยกระทบตกตีแบคแฮนด์หนอทิ่มกระพือสอยดีดกำแพงหนึ่งทีแล้วค้างคว้า', durationOrSetsEn: '4 min', durationOrSetsTh: '4 นาที', durationSeconds: 240 },
      { nameEn: 'Finish: 10 clean forehands + 10 clean backhands', nameTh: 'รอบพิชิตใจ: กวาดโฟร์แฮนด์คมกระแทกแน่นเต็มเป้าสมาธิ 10 ทีคู่แบคแฮนด์ 10 ทีติด', durationOrSetsEn: '20 clean reps', durationOrSetsTh: 'ตีโฟร์แฮนด์เป้าเป๊ะ 10 และแบคแฮนด์ 10 ครั้งลงเป้าพอ' }
    ],
    fullDurationRange: '30-40 Min',
    fullExercises: [
      { nameEn: 'No-ball shadow swing', nameTh: 'ปั้นสวิงแห้งพ่นแนวพิกเกิลสัมผัสจินตภาพระเบียบตัว', durationOrSetsEn: '3 min', durationOrSetsTh: '3 นาที', durationSeconds: 180 },
      { nameEn: 'Drop-hit forehand', nameTh: 'ดรอบปะทะตีโฟร์แฮนด์เด้งรับส่งสม่ำเสมอเข้าจุดพิกเซล', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Drop-hit backhand', nameTh: 'ดรอบงัดเด้งมุมหลังแบคแฮนด์สลับเกร็งปลายนิ่ว', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Forehand 3-ball rally', nameTh: 'ปักเป้าลอยตีโฟร์แฮนด์ให้เด้งติดต่อพยุงบอลกำแพง 3 แรลลี่รวดต่อเนื่องสติจดจ้อง', durationOrSetsEn: '8 min', durationOrSetsTh: '8 นาที', durationSeconds: 480 },
      { nameEn: 'Backhand 3-ball rally', nameTh: 'ปักรับแบคแฮนด์ยืดลอยตีกระทบนิ่มนวลสะท้อนยึด 3 ครั้งต่อเนื่องคุมทรง', durationOrSetsEn: '8 min', durationOrSetsTh: '8 นาที', durationSeconds: 480 },
      { nameEn: 'Dink-height control', nameTh: 'ฝึกการดิงก์หยอดเตี้ยหน้ากำแพงคุมกระดอนระนาบตาเบาขยับ', durationOrSetsEn: '6 min', durationOrSetsTh: '6 นาที', durationSeconds: 360 },
      { nameEn: 'Finish: 10 clean forehands + 10 clean backhands', nameTh: 'ปิดท้ายด้วยความคมระดับพระกาฬ: ตีเนื้อแน่นปึกไม่เป๋ซ้ายขวาอย่างละ 10 ชุดสมบูรณ์', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-7.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/JhkhTb1q/Chat-GPT-Image-May-21-2026-12-56-19-PM.png',
    fullImageUrl: 'https://i.postimg.cc/BvKvhxqC/Chat-GPT-Image-May-21-2026-12-57-34-PM.png'
  },
  {
    id: 8,
    slug: 'pre-match',
    titleEn: '8. PRE-MATCH WARM-UP DAY',
    titleTh: '8. วันเตรียมอบอุ่นร่างกายก่อนการแข่งขันหลัก',
    useWhenEn: 'Before real play, especially when you only have a few minutes.',
    useWhenTh: 'ทำก่อนลงนามสนามแข่งขันจริงทุกลีก โดยเฉพาะเวลาลนเหลือเวลาจำกัดเพียงไม่กี่เสี้ยวนาทีท้าชิง',
    goalEn: 'Arrive awake, not tired.',
    goalTh: 'ปลุกระบบประสาทพร้อมฟันฝ่าพละระเบิดตัวตื่น ไม่ใช่ไปเหนื่อยล้าดึงความอืดสะกดสนามเปล่าเสียลมหายใจ',
    coachRuleEn: 'Warm-up should sharpen you, not consume energy.',
    coachRuleTh: 'การวอร์มอุ่นควรกระตุ้นเรียกฝีเท้าตาสว่างเฉียบแหลม ไม่ใช่ไปเผาผลาญพลังขับคลื่นสมองเบิร์นทิ้งหมดก๊อกแรก',
    easyDurationRange: '5-10 Min',
    easyExercises: [
      { nameEn: 'Easy bounce / walk / light jog', nameTh: 'ตบส้นเขย่าหยุ่นเบาๆ / เดินกึ่งปั่นฟอร์ม / จ็อกทางเรียบเรียกหัวใจ', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Calf raises + ankle rocks', nameTh: 'เขย่งบิ้วน่องเท้าและเอียงยืดเส้นข้อส่วนพับด้านหลัง', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Hip opener + light side lunge', nameTh: 'บิดควงสะโพกเปิดหน้าขารวมถึงหย่อนเป้าวอร์มเอียงย่อสะพายข้างพอเบาๆ', durationOrSetsEn: '1-2 min', durationOrSetsTh: '1-2 นาที', durationSeconds: 90 },
      { nameEn: 'Arm circles + wrist circles', nameTh: 'วอนบิดหมุนแกนแขนศอกคลายสลักนิ้วข้อมือสลับกันเป็นวงสว่าง', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Ready position -> split step -> side shuffle', nameTh: 'ร้อยจังหวะผูก: ยืนสแตนบาย -> ซอยสับเท้ากว้าง -> สไลด์ผ่อนข้างซ้ายขวาเป่า', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Shadow forehand, backhand, dink, serve', nameTh: 'หมวดหวดสะบัดพู่กันแห้ง: โฟร์แฮนด์ แบคแฮนด์ ดีงก์ และสเต็ปปล่อยลูกปั่นลม', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 }
    ],
    fullDurationRange: '20-30 Min',
    fullExercises: [
      { nameEn: 'Easy bounce / walk / light jog', nameTh: 'จ็อกเรียกอุณหภูมิร่างกายปัดเป่ากรดล้าจากเดิมฟื้นตัว', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Calf raises + ankle rocks', nameTh: 'เขย่งเขี้ยวแกว่งเอียงขยายกล้ามแข้งน่องป้องเอ็นอักเสบ', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Hip opener + light side lunge', nameTh: 'ขยายข้อต่อแกนโคนตะโพกข้างหนีบบาดเจ็บทางย่อสะบัก', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Arm circles + wrist circles', nameTh: 'สะบัดกวัดไกวปัดเป่าความติดขัดหัวไหล่พับขวา', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Ready position -> split step -> side shuffle', nameTh: 'ซ้อมสัญญารีเฟล็กซ์สับหลบหนีบวิ่งก้าวหยุดทรงพลัง', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Shadow forehand, backhand, dink, serve', nameTh: 'ท่าตบดรอบปั่นร่อนลมคุมวิถีให้คุ้นกล้ามรอบหม้อดิน', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Light footwork reset', nameTh: 'ปักปลุกการวางเท้าให้กลับมาสดกระชับไม่ล้นพิกเซลเตี้ย', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Serve shadow', nameTh: 'เซ็ตวงแขนเหวี่ยงปั่นความสปริงเสิร์ฟให้มั่นใจวิถีโค้งดึง', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Soft dink/touch', nameTh: 'ซ้อมสับข้อมือกะเกณฑ์ตระหนักแรงสะท้อนหยอดเบาหน้าอก', durationOrSetsEn: '5 min', durationOrSetsTh: '5 นาที', durationSeconds: 300 },
      { nameEn: 'Easy rally or wall touch', nameTh: 'ลงตีสนามซิกแซกแรลลี่กับเพื่อนฝูงเบาๆ หรือสาดอุ่นกำแพงซึมซับ', durationOrSetsEn: '5-10 min', durationOrSetsTh: '5-10 นาที', durationSeconds: 450 }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-8.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/cJnJDQsM/Chat-GPT-Image-May-21-2026-12-58-48-PM.png',
    fullImageUrl: 'https://i.postimg.cc/W45PwzZB/Chat-GPT-Image-May-22-2026-10-05-51-AM.png'
  },
  {
    id: 9,
    slug: 'post-match',
    titleEn: '9. POST-MATCH COOLDOWN DAY',
    titleTh: '9. วันคลายอุณหภูมิร่างกายและกล้ามเนื้อหลังแข่ง',
    useWhenEn: 'After every real play session, especially Wednesday, Friday, or Sunday.',
    useWhenTh: 'เน้นย้ำทำตามหลังจบศึกสีกวดไม้พิกเกิลคอร์ทจัดเต็ม โดยเฉพาะบ่ายวันพุธ มูฟเมนต์วันศุกร์ หรือคิวอาทิตย์ล้างแค้น',
    goalEn: 'Write only one main mistake. Do not over-analyze.',
    goalTh: 'ยึดสายระบายผ่อนหัวใจ จดบันทึกเจาะความผิดพลาดโด่งแค่ข้อเดียวพอ ห้ามคิดหมกมุ่นฟุ้งซ่านพิจารณาเยอะแยะให้เหนื่อยจิตเกินพิกัด',
    coachRuleEn: 'Write only one main mistake. Do not over-analyze.',
    coachRuleTh: 'จดบันทึกเขียนเจาะความผิดพลาดของตนแค่ 1 หัวข้อหลักเพื่อซ่อมแซมรอบหน้า ห้ามคิดฟุ้งซ่านพิจารณาหลายเรื่องมากไป',
    easyDurationRange: '8-10 Min',
    easyExercises: [
      { nameEn: 'Calf stretch', nameTh: 'ย่นขากดส้นยืดแผ่นน่องพยับกำแพงลึก', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hamstring stretch', nameTh: 'พับหลังกวาดส้นก้มแตะยืดเอ็นกลุ่มน่องหลังเข่าขาตึง', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hip flexor stretch', nameTh: 'ถอยขาหน้าตึงหย่อนสะโพกแอ่นนิดๆเปิดตึงตัวก้นสะพาย', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Forearm/wrist stretch', nameTh: 'แอ่นฝ่ามือกดเบี้ยวหงายสะพานคลายข้อมือหวดเมื่อยล้า', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Shoulder cross-body stretch', nameTh: 'ดึงขวับบวกแขนโอบรอบคอสะสางหัวไหล่ตึงล้าทั้งสองด้าน', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Breathing cooldown', nameTh: 'ปิดตานั่งปรับคลื่นลบลมคลายหัวใจปรับผ่อนชีพจรลึก', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 }
    ],
    fullDurationRange: '20-30 Min',
    fullExercises: [
      { nameEn: 'Calf stretch', nameTh: 'ดันกำแพงโยกยืดเหยียดน่องผ่อนความเกร็งกระดอนลอยตัว', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hamstring stretch', nameTh: 'ก้มสะโพกตรงกดต้นขาหลังผ่อนสลายกรดแลคติกสะสมคอร์ท', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Hip flexor stretch', nameTh: 'ตั้งฉากสะประสาทผ่อนคลายก้นและแกนท่อนหน้าสะโพกคู่', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Forearm/wrist stretch', nameTh: 'คลายตะคริวยิงข้อเคาะลูกสยบตึงฝ่ามือนิ้วระวิง', durationOrSetsEn: '1 min', durationOrSetsTh: '1 นาที', durationSeconds: 60 },
      { nameEn: 'Shoulder cross-body stretch', nameTh: 'ดึงแขนขนานอกสลายกรดกล้ามเนื้อข้อต่อหมุนแขนสลับซ้ายขวา', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Figure-4 glute stretch', nameTh: 'หนุนนอนยกขากอดรูปทับซ้อนเกลาก้นสะโพกระเบิดตึง', durationOrSetsEn: '1 min each side', durationOrSetsTh: 'ข้างละ 1 นาที', durationSeconds: 120 },
      { nameEn: 'Thoracic rotation', nameTh: 'เปิดกระดูกบิดกระบังบ่าลดการอั้นลมบิดอักเสบคอหลัง', durationOrSetsEn: '2 min', durationOrSetsTh: '2 นาที', durationSeconds: 120 },
      { nameEn: 'Light walk', nameTh: 'เดินลบอารมณ์ความสติรอบสนามผ่อนความร้อน 10 นาทีนิ่ง', durationOrSetsEn: '10 min', durationOrSetsTh: '10 นาที', durationSeconds: 600 },
      { nameEn: 'Breathing cooldown & Quick notes', nameTh: 'สมาธิผ่อนเกร็งคลื่นระบบประสาท พร้อมบันทึกข้อปรับหลักข้อเดียวลงไดอารี่', durationOrSetsEn: 'Self-cooldown + notes', durationOrSetsTh: 'หายใจผ่อนสมาธิ 1 นาที พร้อมบันทึกสิ่งดีๆและสิ่งปรับหนึ่งเดียว' }
    ],
    imageUrl: import.meta.env.BASE_URL + 'images/plan-9.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    easyImageUrl: 'https://i.postimg.cc/NMWGRLqv/Chat-GPT-Image-May-22-2026-10-07-23-AM.png',
    fullImageUrl: 'https://i.postimg.cc/tgxgrhXx/Chat-GPT-Image-May-21-2026-01-08-14-PM.png'
  }
];

export const weekRhythms = {
  descriptionTh: 'ตารางสัปดาห์ที่แนะนำตามหลักสากล เพื่อรักษาความฟิตทนทาน ปั่นสมาธิ และกันความล้าสะสม',
  descriptionEn: 'Flexible weekly target rhythm: 2-3 skill days, 1-2 strength days, 2-3 recovery days.',
  targetTh: 'เป้าหมายที่ยืดหยุ่นได้: ฝึกทักษะฝีมือ 2-3 วัน | เสริมความแข็งแกร่ง 1-2 วัน | ฟื้นฟูร่างกายยืดเหยียด 2-3 วัน',
  targetEn: 'Flexible target: 2-3 skill days | 1-2 strength days | 2-3 recovery/mobility days',
  scenarios: [
    {
      titleTh: 'หากลงแข่งหนาแน่น พุธ ศุกร์ อาทิตย์ (Wednesday, Friday, Sunday)',
      titleEn: 'If you play Wednesday, Friday, and Sunday:',
      scheduleTh: [
        { dayTh: 'จันทร์', dayEn: 'Monday', labelTh: 'ฟื้นฟูกล้ามเนื้อเท่านั้น (วันเหงื่อนิ่งจากการสะสมวันอาทิตย์)', labelEn: 'Recovery only (due to Sunday load)', type: 'recovery' },
        { dayTh: 'อังคาร', dayEn: 'Tuesday', labelTh: 'สร้างความแข็งแกร่ง (Strength Day - ปริมาณปานกลาง)', labelEn: 'Strength Day (Moderate volume)', type: 'strength' },
        { dayTh: 'พุธ', dayEn: 'Wednesday', labelTh: 'แข่งจริง (เล่นในคอร์ท) + วอร์มอัพ/คูลดาวน์ก่อน-หลัง', labelEn: 'Match Day + Pre/Post routines', type: 'match' },
        { dayTh: 'พฤหัสบดี', dayEn: 'Thursday', labelTh: 'สร้างความแข็งแกร่ง (Strength Day) หรือซ้อมเคาะเงียบจัดตำแหน่ง', labelEn: 'Strength Day or Fix Position Day', type: 'strength' },
        { dayTh: 'ศุกร์', dayEn: 'Friday', labelTh: 'แข่งจริง (เล่นในคอร์ท) + วอร์มอัพ/คูลดาวน์ก่อน-หลัง', labelEn: 'Match Day + Pre/Post routines', type: 'match' },
        { dayTh: 'เสาร์', dayEn: 'Saturday', labelTh: 'ฝึกมือเบา (Soft Touch) หรือยืดกล้ามเนื้อเบาๆ ห้ามหักโหม', labelEn: 'Soft Touch or Light Stretch; keep it easy', type: 'skill' },
        { dayTh: 'อาทิตย์', dayEn: 'Sunday', labelTh: 'แข่งจริง (คอร์ทยักษ์) + วอร์มอัพ/คูลดาวน์ก่อน-หลัง', labelEn: 'Match Day + Pre/Post routines', type: 'match' }
      ]
    },
    {
      titleTh: 'หากลงซ้อมแข่งช่วงสุดสัปดาห์ติดต่อกัน ศุกร์ เสาร์ อาทิตย์',
      titleEn: 'If playing Friday + Saturday + Sunday:',
      scheduleTh: [
        { dayTh: 'จันทร์', dayEn: 'Monday', labelTh: 'ฟื้นฟูกายภาพกล้ามเนื้อเต็มพิกัด (Stretch / Recovery)', labelEn: 'Full Stretch / Recovery Day', type: 'recovery' },
        { dayTh: 'อังคาร', dayEn: 'Tuesday', labelTh: 'ปั้นพละกำลังเสริมกล้ามเนื้อสะโพกหน้าขา (Strength Day)', labelEn: 'Strength Day', type: 'strength' },
        { dayTh: 'พุธ', dayEn: 'Wednesday', labelTh: 'วันซ้อมเทคนิคการเสิร์ฟและการรีเทิร์น (Serve + Return Day)', labelEn: 'Serve + Return Day', type: 'skill' },
        { dayTh: 'พฤหัสบดี', dayEn: 'Thursday', labelTh: 'ซ้อมสเต็ปรอบตัวตระหนักไม้ (Fix Position / Wall Drill)', labelEn: 'Fix Position or Wall Drill Day', type: 'skill' },
        { dayTh: 'ศุกร์', dayEn: 'Friday', labelTh: 'แข่งจริง + วอร์ม/คูลดาวน์หลักเลี่ยงเจ็บ', labelEn: 'Match Day + Warmup/Cooldown', type: 'match' },
        { dayTh: 'เสาร์', dayEn: 'Saturday', labelTh: 'แข่งจริง + วอร์ม/คูลดาวน์ปะทะ', labelEn: 'Match Day + Warmup/Cooldown', type: 'match' },
        { dayTh: 'อาทิตย์', dayEn: 'Sunday', labelTh: 'แข่งจริง + วอร์ม/คูลดาวน์สมากรดเลิกรา', labelEn: 'Match Day + Warmup/Cooldown', type: 'match' }
      ]
    }
  ]
};
