import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Briefcase, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Users, 
  Check, 
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Clock,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPETENCIES, PROJECTS, TEAM_MEMBERS } from './data';
import { Project, Competency, ContactFormInput } from './types';

export default function App() {
  // Navigation & interaction states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeCompetency, setActiveCompetency] = useState<string>('ai');
  
  // Interactive estimator states
  const [selectedDirection, setSelectedDirection] = useState<string>('ai');
  const [selectedScale, setSelectedScale] = useState<string>('medium');

  // Filter projects based on active tab
  const filteredProjects = PROJECTS.filter(project => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  // Calculate estimated cost and timeline based on direction and scale
  const getEstimation = (direction: string, scale: string) => {
    let baseDays = 15;
    let baseCost = 'от 150 000 ₽';
    let milestones: string[] = [];
    let stack: string[] = [];

    if (direction === 'ai') {
      stack = ['ASP.NET Core', 'Semantic Kernel', 'RAG Pipes', 'PostgreSQL', 'Docker', 'Python/ML'];
      if (scale === 'small') {
        baseDays = 14;
        baseCost = '150 000 – 250 000 ₽';
        milestones = ['Исследование и сбор требований (3 дня)', 'Разработка RAG пайплайна и интеграция LLM (6 дней)', 'Интеграция плагина и тестирование (5 дней)'];
      } else if (scale === 'medium') {
        baseDays = 30;
        baseCost = '350 000 – 600 000 ₽';
        milestones = ['Архитектура микросервисов и БД (5 дней)', 'Интеграция ИИ-моделей и RAG (10 дней)', 'Синхронизация с CRM (Jira/Notion) (8 дней)', 'Тестирование xUnit и запуск (7 дней)'];
      } else {
        baseDays = 60;
        baseCost = 'от 800 000 ₽';
        milestones = ['Проектирование распределенной ИИ-системы (10 дней)', 'Обучение/файнтюн локальных моделей (15 дней)', 'Реализация SAGA оркестрации (15 дней)', 'Нагрузочное тестирование и Docker-кластер (20 дней)'];
      }
    } else if (direction === 'finance') {
      stack = ['C#', 'ASP.NET Core', 'PostgreSQL / MS SQL', 'Redis', 'Dapper', 'xUnit'];
      if (scale === 'small') {
        baseDays = 20;
        baseCost = '200 000 – 350 000 ₽';
        milestones = ['Проектирование структуры БД (5 дней)', 'Реализация API оценки активов (10 дней)', 'Тестирование формул и сдача (5 дней)'];
      } else if (scale === 'medium') {
        baseDays = 40;
        baseCost = '450 000 – 800 000 ₽';
        milestones = ['Анализ формул и проектирование API (7 дней)', 'Микросервисы оценки стоимости (15 дней)', 'Интеграция с внешними фондами и ПИФ (10 дней)', 'Нагрузочное тестирование транзакций (8 дней)'];
      } else {
        baseDays = 75;
        baseCost = 'от 1 200 000 ₽';
        milestones = ['Проектирование финансовой архитектуры (12 дней)', 'Разработка распределенного ядра калькуляции (25 дней)', 'Интеграции с биржами и шиной данных (18 дней)', 'Оптимизация баз данных и резервирование (20 дней)'];
      }
    } else if (direction === 'medicine') {
      stack = ['ASP.NET MVC/Core', 'Entity Framework', 'MSSQL / Postgres', 'Kibana/Logstash', 'ETL Pipes'];
      if (scale === 'small') {
        baseDays = 18;
        baseCost = '180 000 – 300 000 ₽';
        milestones = ['Сбор медицинских требований (4 дня)', 'Разработка ETL скриптов обмена (8 дней)', 'Тестирование синхронизации данных (6 дней)'];
      } else if (scale === 'medium') {
        baseDays = 35;
        baseCost = '400 000 – 700 000 ₽';
        milestones = ['Проектирование медицинских справочников и БД (8 дней)', 'Разработка модулей сбора и агрегации данных о пациентах (12 дней)', 'Умная система SMS/Email уведомлений (7 дней)', 'Тестирование стабильности ETL (8 дней)'];
      } else {
        baseDays = 70;
        baseCost = 'от 1 000 000 ₽';
        milestones = ['Сбор требований интеграции с ГИС (15 дней)', 'Разработка распределенного ядра МИС (20 дней)', 'Реализация ETL контуров обмена медучреждений (20 дней)', 'Отказоустойчивое резервирование и аудит безопасности (15 дней)'];
      }
    } else {
      stack = ['ASP.NET Core', 'C#', 'React', 'TypeScript', 'Tailwind CSS', 'Docker', 'Redis'];
      if (scale === 'small') {
        baseDays = 15;
        baseCost = '150 000 – 250 000 ₽';
        milestones = ['Проектирование интерфейсов и API (4 дня)', 'Разработка backend и frontend (7 дней)', 'Настройка Docker и развертывание (4 дня)'];
      } else if (scale === 'medium') {
        baseDays = 30;
        baseCost = '300 000 – 550 000 ₽';
        milestones = ['Спецификация требований и дизайн (6 дней)', 'Разработка БД и API сервисов (10 дней)', 'Верстка интерфейса на React + Tailwind (8 дней)', 'Тестирование xUnit и развертывание в Docker (6 дней)'];
      } else {
        baseDays = 60;
        baseCost = 'от 700 000 ₽';
        milestones = ['Анализ бизнес-процессов компании (10 дней)', 'Проектирование ERP/CRM микросервисов (15 дней)', 'Сложная ролевая модель и API (15 дней)', 'Интеграция с Active Directory, 1С и телефонией (12 дней)', 'Стабилизация и нагрузочное тестирование (8 дней)'];
      }
    }

    return { days: baseDays, cost: baseCost, milestones, stack };
  };

  const currentEstimation = getEstimation(selectedDirection, selectedScale);



  const toggleProject = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  // Icon selector component helper
  const renderCompetencyIcon = (iconName: string, customClass: string = "w-5 h-5 text-neutral-900") => {
    const props = { className: customClass };
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Code {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#18181b] font-sans selection:bg-neutral-900 selection:text-white overflow-x-hidden antialiased">
      {/* Dynamic top bar decoration */}
      <div className="h-1 bg-neutral-900 w-full" />

      {/* Modern High-End Grid Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo / Wordmark */}
            <div className="flex items-center space-x-3">
              <Code className="w-5 h-5 text-neutral-900" />
              <span className="h-5 w-[1px] bg-neutral-200" />
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-neutral-500 hidden sm:inline">Свободны для проектов</span>
              </div>
            </div>

            {/* Anchors / Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-600">
              <a href="#competencies" className="hover:text-neutral-950 transition-colors">Компетенции</a>
              <a href="#metrics" className="hover:text-neutral-950 transition-colors">Результаты</a>
              <a href="#projects" className="hover:text-neutral-950 transition-colors">Проекты ({PROJECTS.length})</a>
              <a href="#team" className="hover:text-neutral-950 transition-colors">Команда</a>
              <a href="#estimator" className="hover:text-neutral-950 transition-colors">Калькулятор</a>
            </nav>

            {/* Instant Action CTA */}
            <div className="flex items-center space-x-4">
              <a 
                href="#estimator" 
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
              >
                Оценить проект <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
              <a 
                href="https://t.me/iByrku" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-4xl">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-xs font-mono text-neutral-700 mb-6 uppercase tracking-wider">
              <Code className="w-3.5 h-3.5 text-neutral-900" />
              <span>Разработка систем на заказ</span>
            </div>

            {/* Core Display Title */}
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.05] mb-8">
              Проектируем и запускаем сложные цифровые системы для бизнеса
            </h1>

            {/* Professional Lead Text & Direct Cooperation Highlight */}
            <div className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed mb-10 max-w-3xl space-y-3">
              <p>
                Мы берём на себя разработку от идеи до запуска: считаем сроки и бюджет заранее, показываем прогресс на каждом этапе и отвечаем за результат.
              </p>
              <p className="text-neutral-950 font-normal">
                <span className="font-bold text-black">Работаем напрямую, без посредников.</span>{" "}
                <span className="text-neutral-900 font-light">
                  Вы общаетесь напрямую с ведущими инженерами и тимлидами без прослоек из аккаунт-менеджеров. Никаких скрытых наценок крупных агентств — вы платите исключительно за чистые часы работы сильной технической команды.
                </span>
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#estimator" 
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-all rounded shadow-sm text-center"
              >
                Обсудить задачу <MessageSquare className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all rounded text-center"
              >
                Смотреть проекты ({PROJECTS.length})
              </a>
            </div>
          </div>

          {/* Core Team Structure Summary Banner */}
          <div className="mt-16 pt-8 border-t border-neutral-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-neutral-800">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Командный ресурс</span>
              <span className="text-lg font-medium font-display block">20 специалистов</span>
              <span className="text-sm text-neutral-500 font-light block mt-1">Аналитика, разработка, ИИ-решения и выделенный QA-отдел.</span>
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Языковая подготовка</span>
              <span className="text-lg font-medium font-display block">Английский C1 / Advanced</span>
              <span className="text-sm text-neutral-500 font-light block mt-1">Свободное ведение технической документации и проведение встреч.</span>
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Глобальный опыт</span>
              <span className="text-lg font-medium font-display block">Интернациональный трек</span>
              <span className="text-sm text-neutral-500 font-light block mt-1">Опыт проектирования систем в зарубежных командах и стартапах.</span>
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Опыт в гигантах</span>
              <span className="text-lg font-medium font-display block">Газпром, МосБиржа, Спартак</span>
              <span className="text-sm text-neutral-500 font-light block mt-1">Наши инженеры проектировали ключевые модули для лидеров рынка.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Slider Row */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest whitespace-nowrap block">
              Наши специалисты разрабатывали системы для:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 items-center">
              <div className="flex items-center justify-start md:justify-center">
                <span className="font-display font-bold text-neutral-800 text-lg tracking-tight">ГАЗПРОМ</span>
              </div>
              <div className="flex items-center justify-start md:justify-center">
                <span className="font-display font-bold text-neutral-800 text-lg tracking-tight">МОСКОВСКАЯ БИРЖА</span>
              </div>
              <div className="flex items-center justify-start md:justify-center">
                <span className="font-display font-bold text-neutral-800 text-lg tracking-tight">НЕТРИКА</span>
              </div>
              <div className="flex items-center justify-start md:justify-center">
                <span className="font-display font-bold text-neutral-800 text-lg tracking-tight">ФК СПАРТАК</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Business Metrics & What we give to business */}
      <section id="metrics" className="py-16 sm:py-24 border-b border-neutral-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Sticky/Fixed-like Side column for title */}
            <div className="lg:col-span-1">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">Влияние на бизнес</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight mb-4">
                Что даёт наша разработка вашему бизнесу
              </h2>
              <p className="text-neutral-500 font-light leading-relaxed">
                Код — это инструмент решения коммерческих задач. Каждая спроектированная нами система направлена на оцифрованную оптимизацию бизнес-показателей, сокращение ручного труда и ускорение операций.
              </p>
            </div>

            {/* Metrics Layout Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Metric 1 */}
              <div className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-center items-center text-center h-64 group">
                <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Оптимизация</span>
                <div className="text-4xl font-mono font-bold text-neutral-900 tracking-tight block group-hover:scale-105 transition-transform duration-200 mb-3">
                  +80%
                </div>
                <p className="text-sm font-semibold text-neutral-800 mb-1.5">Рост производительности</p>
                <p className="text-xs text-neutral-500 font-light leading-normal max-w-[220px]">
                  выросла общая пропускная способность сервисов оценки стоимости и баз данных после архитектурного рефакторинга.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-center items-center text-center h-64 group">
                <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">ИИ-модерация</span>
                <div className="text-4xl font-mono font-bold text-neutral-900 tracking-tight block group-hover:scale-105 transition-transform duration-200 mb-3">
                  ×20
                </div>
                <p className="text-sm font-semibold text-neutral-800 mb-1.5">Ускорение процессов</p>
                <p className="text-xs text-neutral-500 font-light leading-normal max-w-[220px]">
                  ускорился процесс цензурирования и разметки видеоматериалов с внедрением автоматических ИИ-агентов.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded shadow-sm hover:border-neutral-300 transition-all flex flex-col justify-center items-center text-center h-64 group">
                <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">Умные уведомления</span>
                <div className="text-4xl font-mono font-bold text-neutral-900 tracking-tight block group-hover:scale-105 transition-transform duration-200 mb-3">
                  −80%
                </div>
                <p className="text-sm font-semibold text-neutral-800 mb-1.5">Снижение пропусков</p>
                <p className="text-xs text-neutral-500 font-light leading-normal max-w-[220px]">
                  сократилось количество пропущенных пациентами визитов за счёт интеллектуальных алгоритмов скоринга и оповещений.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competencies Section */}
      <section id="competencies" className="py-16 sm:py-24 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Чем можем помочь</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Наши ключевые компетенции
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Nav Menu for Competencies */}
            <div className="lg:col-span-5 space-y-3">
              {COMPETENCIES.map((comp) => {
                const isActive = activeCompetency === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveCompetency(comp.id)}
                    className={`w-full text-left p-5 rounded border transition-all flex items-start space-x-4 ${
                      isActive 
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm' 
                        : 'bg-neutral-50 text-neutral-800 border-neutral-200/70 hover:bg-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`p-2 rounded-sm transition-colors ${isActive ? 'bg-white/15' : 'bg-neutral-200/60'}`}>
                      {renderCompetencyIcon(comp.iconName, isActive ? 'w-5 h-5 text-white' : 'w-5 h-5 text-neutral-900')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-semibold tracking-tight text-sm sm:text-base">
                          {comp.title}
                        </span>
                        <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${isActive ? 'rotate-0 text-white' : '-rotate-45 text-neutral-400'}`} />
                      </div>
                      <p className={`text-xs mt-1.5 line-clamp-2 ${isActive ? 'text-neutral-300 font-light' : 'text-neutral-500 font-light'}`}>
                        {comp.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Display Board for Selected Competency details */}
            <div className="lg:col-span-7 bg-[#fafafa] border border-neutral-200 p-8 sm:p-10 rounded relative flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {COMPETENCIES.map((comp) => {
                  if (comp.id !== activeCompetency) return null;
                  return (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 pb-4 border-b border-neutral-200">
                        <div className="text-neutral-950">
                          {renderCompetencyIcon(comp.iconName, "w-6 h-6 text-neutral-950")}
                        </div>
                        <div>
                          <span className="text-xs font-mono text-neutral-400 block">Раздел экспертизы</span>
                          <h3 className="font-display font-bold text-xl text-neutral-950 tracking-tight">
                            {comp.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-neutral-600 font-light leading-relaxed text-sm sm:text-base">
                        {comp.description}
                      </p>

                      <div className="space-y-3.5">
                        <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block">Что мы умеем делать превосходно:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {comp.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                              <span className="p-1 bg-neutral-900 text-white rounded-full mt-0.5">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack highlights */}
                      <div className="pt-6 border-t border-neutral-200">
                        <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">Основной стек технологий направления</span>
                        <div className="flex flex-wrap gap-1.5">
                          {comp.id === 'ai' && ['Semantic Kernel', 'RAG Pipes', 'MCP', 'ASP.NET Core', 'Python', 'FastAPI', 'Docker'].map(s => (
                            <span key={s} className="px-2 py-1 bg-neutral-100 text-[#18181b] font-mono text-[10px] sm:text-xs rounded border border-neutral-200">{s}</span>
                          ))}
                          {comp.id === 'finance' && ['C#', 'ASP.NET Core', 'MSSQL', 'PostgreSQL', 'Dapper', 'Redis', 'xUnit'].map(s => (
                            <span key={s} className="px-2 py-1 bg-neutral-100 text-[#18181b] font-mono text-[10px] sm:text-xs rounded border border-neutral-200">{s}</span>
                          ))}
                          {comp.id === 'medicine' && ['ASP.NET Core/MVC', 'MSSQL', 'Entity Framework', 'Docker', 'Kibana', 'ETL tools'].map(s => (
                            <span key={s} className="px-2 py-1 bg-neutral-100 text-[#18181b] font-mono text-[10px] sm:text-xs rounded border border-neutral-200">{s}</span>
                          ))}
                          {comp.id === 'corporate' && ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'].map(s => (
                            <span key={s} className="px-2 py-1 bg-neutral-100 text-[#18181b] font-mono text-[10px] sm:text-xs rounded border border-neutral-200">{s}</span>
                          ))}
                          {comp.id === 'integration' && ['MassTransit', 'RabbitMQ', 'Saga', 'Entity Framework', 'Docker', 'REST API', 'Oracle'].map(s => (
                            <span key={s} className="px-2 py-1 bg-neutral-100 text-[#18181b] font-mono text-[10px] sm:text-xs rounded border border-neutral-200">{s}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase section */}
      <section id="projects" className="py-16 sm:py-24 border-b border-neutral-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Наше портфолио</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                Проекты, которыми мы гордимся
              </h2>
              <p className="text-neutral-500 text-sm font-light mt-1.5 max-w-2xl">
                Реальный опыт разработки высоконагруженных бэкендов, интеграций и систем автоматизации. Нажмите на проект, чтобы увидеть детали реализации.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Все проекты' },
                { id: 'ai', label: 'ИИ и RAG' },
                { id: 'finance', label: 'Финтех' },
                { id: 'medicine', label: 'Медицина' },
                { id: 'corporate', label: 'Корпоративные' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setExpandedProject(null); // Reset expanded details on change
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                    activeCategory === tab.id
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Projects */}
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProject === project.id;
              return (
                <div 
                  key={project.id}
                  className={`bg-white border rounded transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-neutral-950 shadow-md ring-1 ring-neutral-950/5' 
                      : 'border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm'
                  }`}
                >
                  {/* Summary row click target */}
                  <div 
                    onClick={() => toggleProject(project.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase rounded border border-neutral-200/60">
                          {project.company}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          {project.period}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-500 font-light max-w-3xl leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6">
                      {project.metrics && (
                        <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-neutral-200 pl-4 md:pl-0 md:pr-4 py-1">
                          <span className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 block leading-none">
                            {project.metrics.value}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mt-1 leading-tight">
                            {project.metrics.label}
                          </span>
                        </div>
                      )}

                      <div className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded text-neutral-500 border border-neutral-200 transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Project Details Sheet */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="border-t border-neutral-200 bg-neutral-50/50"
                      >
                        <div className="p-6 sm:p-8 space-y-8">
                          {/* Rich Paragraph */}
                          <div className="space-y-2.5">
                            <span className="text-xs font-mono text-neutral-400 uppercase block">Описание проекта</span>
                            <p className="text-neutral-700 font-light leading-relaxed text-sm sm:text-base">
                              {project.fullDesc}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Responsibilities */}
                            <div className="space-y-3">
                              <span className="text-xs font-mono text-neutral-400 uppercase block">Выполненные работы</span>
                              <ul className="space-y-2">
                                {project.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-600 font-light">
                                    <span className="p-1 text-neutral-900 mt-0.5 font-bold font-mono">
                                      —
                                    </span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements (if any) */}
                            {project.achievements && project.achievements.length > 0 && (
                              <div className="space-y-3 bg-neutral-100/60 p-5 rounded border border-neutral-200/50">
                                <span className="text-xs font-mono text-neutral-900 font-bold uppercase tracking-wider flex items-center">
                                  <ShieldCheck className="w-4 h-4 mr-1.5 text-neutral-900" /> Личные & Командные достижения
                                </span>
                                <ul className="space-y-2.5">
                                  {project.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-neutral-800 font-medium">
                                      <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-full mt-0.5">
                                        <Check className="w-3 h-3" />
                                      </span>
                                      <span>{ach}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Tech stack tags */}
                          <div className="pt-6 border-t border-neutral-200">
                            <span className="text-xs font-mono text-neutral-400 uppercase block mb-3">Использованный стек технологий</span>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.map((tech) => (
                                <span 
                                  key={tech}
                                  className="px-2.5 py-1 bg-white text-neutral-800 font-mono text-xs rounded border border-neutral-200/80 shadow-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Composition section */}
      <section id="team" className="py-16 sm:py-24 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Наш состав</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                  20 слаженных специалистов под ключ
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base font-light mt-3 leading-relaxed">
                  Мы работаем как сформированная полноценная автономная единица. Наши аналитики прорабатывают детальные спецификации и ТЗ, бэкенд проектирует отказоустойчивую архитектуру, фронтенд создает отзывчивые интерфейсы, а QA-специалисты гарантируют абсолютную стабильность решения. Все ключевые специалисты обладают подтвержденным опытом в распределенных международных командах.
                </p>
              </div>

              {/* Composition summary stats */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded space-y-4">
                <span className="text-xs font-mono text-neutral-400 uppercase block">Технологическое ядро команды:</span>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white border border-neutral-200 p-3 rounded">
                    <span className="text-2xl font-mono font-bold text-neutral-900 block">45%</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mt-1">Бэкенд .NET / PHP</span>
                  </div>
                  <div className="bg-white border border-neutral-200 p-3 rounded">
                    <span className="text-2xl font-mono font-bold text-neutral-900 block">20%</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mt-1">Фронтенд React</span>
                  </div>
                  <div className="bg-white border border-neutral-200 p-3 rounded">
                    <span className="text-2xl font-mono font-bold text-neutral-900 block">15%</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mt-1">ИИ и Python / RAG</span>
                  </div>
                  <div className="bg-white border border-neutral-200 p-3 rounded">
                    <span className="text-2xl font-mono font-bold text-neutral-900 block">20%</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mt-1">Аналитика & QA</span>
                  </div>
                </div>
              </div>

              {/* International & English standards box */}
              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded space-y-3.5">
                <span className="text-xs font-mono text-neutral-400 uppercase block">Международные стандарты:</span>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-700 font-light">
                    <span className="font-mono text-[10px] font-bold text-neutral-900 bg-amber-400 w-5 h-5 flex items-center justify-center rounded shrink-0">
                      C1
                    </span>
                    <div>
                      <strong className="font-medium text-neutral-950 block">Английский язык — Advanced / С1</strong>
                      <span className="text-neutral-500 text-xs mt-1 block">Свободное написание технической документации, проведение презентаций и сессий планирования на английском языке.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-700 font-light">
                    <span className="font-mono text-[10px] font-bold text-neutral-900 bg-neutral-200 w-5 h-5 flex items-center justify-center rounded shrink-0">
                      INT
                    </span>
                    <div>
                      <strong className="font-medium text-neutral-950 block">Опыт в зарубежных проектах</strong>
                      <span className="text-neutral-500 text-xs mt-1 block">Наши специалисты успешно работали над продуктами для рынков США, Европы и Азии в распределенных кросс-функциональных командах.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* List of specialists & skills */}
            <div className="lg:col-span-7 space-y-4">
              {TEAM_MEMBERS.map((member, idx) => (
                <div 
                  key={idx}
                  className="bg-neutral-50 border border-neutral-200/80 p-5 sm:p-6 rounded hover:border-neutral-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold bg-neutral-900 text-white w-5 h-5 flex items-center justify-center rounded">
                        {member.count}
                      </span>
                      <h4 className="font-display font-bold text-neutral-900 text-sm sm:text-base">
                        {member.role}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {member.skills.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-white text-neutral-600 border border-neutral-200 font-mono text-[10px] sm:text-xs rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-neutral-400 block uppercase">Стаж каждого</span>
                    <span className="text-sm font-semibold text-neutral-800 font-display">Middle+ / Senior</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Process (How we work) */}
      <section className="py-16 sm:py-24 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Прозрачные процессы</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Как выстроена работа с нами
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light mt-3 leading-relaxed">
              Мы не маскируем пробелы за умными аббревиатурами. Наш процесс разделен на простые, предсказуемые и прозрачные этапы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded shadow-xs relative group hover:border-neutral-400 transition-colors">
              <span className="font-mono text-4xl font-bold text-neutral-200 group-hover:text-neutral-900 transition-colors block mb-4">01</span>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">Обсуждаем задачу</h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                Внимательно выслушиваем ваши боли и требования бизнеса. Помогаем составить ТЗ человеческим языком без технического жаргона.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded shadow-xs relative group hover:border-neutral-400 transition-colors">
              <span className="font-mono text-4xl font-bold text-neutral-200 group-hover:text-neutral-900 transition-colors block mb-4">02</span>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">Считаем сроки и бюджет</h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                Делаем точную оценку объемов. Вы получаете детальный, понятный план и зафиксированную в смете стоимость до начала написания кода.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded shadow-xs relative group hover:border-neutral-400 transition-colors">
              <span className="font-mono text-4xl font-bold text-neutral-200 group-hover:text-neutral-900 transition-colors block mb-4">03</span>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">Делаем и показываем</h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                Регулярно (каждые 1-2 недели) демонстрируем готовый, протестированный рабочий функционал. Никаких сюрпризов в конце.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 rounded shadow-xs relative group hover:border-neutral-400 transition-colors">
              <span className="font-mono text-4xl font-bold text-neutral-200 group-hover:text-neutral-900 transition-colors block mb-4">04</span>
              <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">Запускаем и ведем</h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                Помогаем бесшовно развернуть проект на серверах. Сопровождаем систему после релиза и помогаем развивать и масштабировать.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation formats */}
      <section className="py-16 sm:py-24 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Варианты взаимодействия</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Форматы сотрудничества
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-neutral-200 p-8 rounded shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-neutral-900 text-white flex items-center justify-center font-mono font-bold">1</div>
                <h3 className="font-display font-bold text-xl text-neutral-900">Разовый проект</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Четкие фиксированные задачи: разработали систему с нуля по согласованному ТЗ, протестировали, передали вам готовые исходные коды и запустили.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase block">Идеально для: MVP, стартапов и готовых ТЗ</span>
            </div>

            <div className="border border-neutral-200 p-8 rounded shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-neutral-900 text-white flex items-center justify-center font-mono font-bold">2</div>
                <h3 className="font-display font-bold text-xl text-neutral-900">Постоянная поддержка</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Постепенное системное развитие вашего действующего ИТ-продукта. Исправление багов, выкатка обновлений и добавление фич на регулярной основе по абонентской плате.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase block">Идеально для: развивающихся ИТ-продуктов</span>
            </div>

            <div className="border border-neutral-200 p-8 rounded shadow-xs hover:border-neutral-300 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-neutral-900 text-white flex items-center justify-center font-mono font-bold">3</div>
                <h3 className="font-display font-bold text-xl text-neutral-900">Команда на аутсорс</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Интегрируем весь наш слаженный инженерный юнит (или его часть) непосредственно в ваши внутренние процессы разработки, если своей экспертизы не хватает.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase block">Идеально для: крупного ИТ и зрелых компаний</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Estimator & Briefing Tool */}
      <section id="estimator" className="py-16 sm:py-24 border-b border-neutral-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Box: Controls and description */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Интерактивный расчет</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                  Быстрый калькулятор проекта
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base font-light mt-3 leading-relaxed">
                  Выберите направление и масштаб будущей системы. Калькулятор мгновенно подготовит стандартную оценку сроков, бюджета, рекомендуемый стек и типовой план вех.
                </p>
              </div>

              {/* Step A: Select direction */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-400 uppercase block">1. Направление проекта</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ai', label: 'ИИ и LLM решения' },
                    { id: 'finance', label: 'Финтех и Расчеты' },
                    { id: 'medicine', label: 'Медицинские системы' },
                    { id: 'corporate', label: 'Порталы / Веб-сервисы' }
                  ].map((dir) => (
                    <button
                      key={dir.id}
                      onClick={() => {
                        setSelectedDirection(dir.id);
                      }}
                      className={`p-3 text-xs text-left rounded border transition-all ${
                        selectedDirection === dir.id
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {dir.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step B: Select scale */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-400 uppercase block">2. Масштаб проекта</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'small', label: 'MVP / Прототип', desc: 'Быстрый старт' },
                    { id: 'medium', label: 'Оптимальный', desc: 'Корпоративный' },
                    { id: 'large', label: 'Масштабный', desc: 'Распределенный' }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setSelectedScale(sc.id);
                      }}
                      className={`p-2.5 text-center rounded border transition-all flex flex-col justify-center items-center ${
                        selectedScale === sc.id
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-xs font-bold font-display">{sc.label}</span>
                      <span className={`text-[10px] mt-0.5 font-light ${selectedScale === sc.id ? 'text-neutral-300' : 'text-neutral-400'}`}>{sc.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Dynamic Output with Direct Contacts */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded shadow-sm">
              <div className="space-y-6">
                <div className="pb-4 border-b border-neutral-100 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase">Ориентировочная оценка</span>
                    <div className="text-2xl font-display font-bold text-neutral-950 mt-1">
                      {currentEstimation.cost}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-neutral-400 uppercase">Срок разработки</span>
                    <div className="text-xl font-mono font-bold text-neutral-950 mt-1 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-neutral-600" /> ~{currentEstimation.days} дней
                    </div>
                  </div>
                </div>

                {/* Recommended tech stack output */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Рекомендуемый стек технологий:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentEstimation.stack.map(st => (
                      <span key={st} className="px-2 py-0.5 bg-neutral-50 text-neutral-800 border border-neutral-200/80 font-mono text-xs rounded">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Roadmap bullets */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Типовые этапы и вехи проекта:</span>
                  <div className="space-y-1.5">
                    {currentEstimation.milestones.map((mil, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-neutral-600 font-light">
                        <span className="font-mono text-[10px] font-bold text-neutral-900 bg-neutral-100 w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5">{mil}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contacts Block */}
                <div className="pt-6 border-t border-neutral-100 space-y-4">
                  <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider block">Обсудить проект напрямую</span>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                    Свяжитесь с нами напрямую, чтобы обсудить ваши требования или отправить техническое задание. Мы подготовим индивидуальное предложение с детальной сметой в течение 24 часов.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <a 
                      href="https://t.me/iByrku" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm py-3 px-4 rounded transition-all shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Написать в Telegram</span>
                    </a>
                    <a 
                      href="mailto:ivanbyrku@gmail.com" 
                      className="inline-flex items-center justify-center space-x-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-medium text-sm py-3 px-4 rounded transition-all"
                    >
                      <Mail className="w-4 h-4 text-neutral-500" />
                      <span>Отправить на почту</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400 pt-1 justify-center sm:justify-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Среднее время ответа в Telegram: 15 минут</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer and Contacts */}
      <footer className="bg-neutral-950 text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-800">
            
            {/* Column A: Logo & Description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-white" />
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Инженерная команда</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
                Мы берем на себя полную разработку цифровых решений с прогнозируемым результатом. Разрабатываем сайты, микросервисы, распределенные шины данных и интегрируем искусственный интеллект в контуры крупных компаний.
              </p>
              <div className="pt-2 flex items-center space-x-3 text-neutral-500 text-xs font-mono">
                <span>© 2026 Команда разработки.</span>
                <span>•</span>
                <span>Все права защищены.</span>
              </div>
            </div>

            {/* Column B: Contact coordinates */}
            <div className="md:col-span-4 space-y-4">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">Прямая связь</span>
              <div className="space-y-3">
                <a 
                  href="mailto:ivanbyrku@gmail.com" 
                  className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded group-hover:border-neutral-700 transition-colors">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase leading-none mb-1">Email для ТЗ</span>
                    <span className="text-sm font-medium font-mono">ivanbyrku@gmail.com</span>
                  </div>
                </a>

                <a 
                  href="https://t.me/iByrku" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded group-hover:border-neutral-700 transition-colors">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase leading-none mb-1">Telegram (Личный / Лид)</span>
                    <span className="text-sm font-medium font-mono">@KaraushIvan</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column C: Fast CTA text block */}
            <div className="md:col-span-3 space-y-4 bg-neutral-900 border border-neutral-800 p-6 rounded">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">ОЦЕНКА ЗА 24 ЧАСА</span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Пришлите описание задачи или ТЗ на почту либо в Telegram — вернемся с точной сметой, сроками и планом реализации в течение суток.
              </p>
              <a 
                href="https://t.me/iByrku" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-xs font-mono text-white hover:underline pt-1"
              >
                Написать в Telegram <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#competencies" className="hover:text-neutral-300 transition-colors">Компетенции</a>
              <a href="#projects" className="hover:text-neutral-300 transition-colors">Портфолио</a>
              <a href="#team" className="hover:text-neutral-300 transition-colors">Специалисты</a>
              <a href="#estimator" className="hover:text-neutral-300 transition-colors">Калькулятор вех</a>
            </div>
            <div className="font-mono text-[10px]">
              Powered by C#/.NET Core, React, and Gemini AI Studio
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal placeholder component to satisfy typescript types if any import issues occur
interface XProps {
  className?: string;
}
function X({ className }: XProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
