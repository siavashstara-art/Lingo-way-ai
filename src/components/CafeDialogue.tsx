import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';
import { DialogueScenario, DialogueChoice, UserProgress } from '../types';
import { DIALOGUE_SCENARIOS } from '../data/dialogues';
import { speakEnglish, sound } from '../utils/audio';

interface CafeDialogueProps {
  progress: UserProgress;
  onCompleteDialogue: (dialogueId: string, reward: number) => void;
}

export const CafeDialogue: React.FC<CafeDialogueProps> = ({
  progress,
  onCompleteDialogue
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DIALOGUE_SCENARIOS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [dialogueHistory, setDialogueHistory] = useState<Array<{
    speaker: string;
    avatar: string;
    text: string;
    feedback?: string;
    isOptimal?: boolean;
    isUser?: boolean;
  }>>([]);
  const [scenarioFinished, setScenarioFinished] = useState(false);

  const scenario = DIALOGUE_SCENARIOS.find(s => s.id === selectedScenarioId) || DIALOGUE_SCENARIOS[0];
  const currentStep = scenario.steps[currentStepIndex] || scenario.steps[0];

  const handleStartScenario = (scenarioId: string) => {
    sound.playClick();
    setSelectedScenarioId(scenarioId);
    setCurrentStepIndex(0);
    setScenarioFinished(false);
    const chosen = DIALOGUE_SCENARIOS.find(s => s.id === scenarioId) || DIALOGUE_SCENARIOS[0];
    setDialogueHistory([{
      speaker: chosen.steps[0].speaker,
      avatar: chosen.steps[0].speakerAvatar,
      text: chosen.steps[0].message,
      isUser: false
    }]);
    speakEnglish(chosen.steps[0].message, progress.speechVoiceRate);
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    sound.playClick();
    if (choice.isOptimal) {
      sound.playChime();
    } else {
      sound.playError();
    }

    const updatedHistory = [
      ...dialogueHistory,
      {
        speaker: 'شما',
        avatar: '👤',
        text: choice.text,
        feedback: choice.feedback,
        isOptimal: choice.isOptimal,
        isUser: true
      },
      {
        speaker: currentStep.speaker,
        avatar: currentStep.speakerAvatar,
        text: choice.response,
        isUser: false
      }
    ];

    setDialogueHistory(updatedHistory);
    speakEnglish(choice.response, progress.speechVoiceRate);

    if (currentStepIndex + 1 < scenario.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setScenarioFinished(true);
      sound.playLevelUp();
      onCompleteDialogue(scenario.id, 35);
    }
  };

  const handleRestart = () => {
    handleStartScenario(scenario.id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <span>☕ بخش ۳</span>
          <span>•</span>
          <span>مکالمات روزمره و تعاملی</span>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
          تمرین گفت‌وگو و مکالمه در موقعیت‌های واقعی 🗣️
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          در موقعیت‌های روزمره مثل کافه، خرید، فرودگاه یا احوالپرسی شرکت کنید، پاسخ بدهید و اصطلاحات عامیانه را به راحتی به خاطر بسپارید.
        </p>
      </div>

      {/* Scenario cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DIALOGUE_SCENARIOS.map((sc) => {
          const isSelected = sc.id === scenario.id;
          const isCompleted = progress.completedDialogueIds.includes(sc.id);

          return (
            <div
              key={sc.id}
              onClick={() => handleStartScenario(sc.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/70 border-emerald-400 text-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {sc.location}
                </span>
                {isCompleted && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> تمرین شده
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-slate-900 mb-1">
                {sc.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {sc.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dialogue Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base sm:text-lg text-slate-900">
            {scenario.title}
          </h2>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>شروع مجدد مکالمه</span>
          </button>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {dialogueHistory.map((item, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${item.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="text-2xl shrink-0 mt-1">{item.avatar}</div>
              
              <div className={`max-w-[85%] space-y-1 ${
                item.isUser ? 'items-end text-left' : 'items-start text-right'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${item.isUser ? 'text-blue-600' : 'text-emerald-700'}`}>
                    {item.speaker}
                  </span>
                  {!item.isUser && (
                    <button
                      onClick={() => speakEnglish(item.text, progress.speechVoiceRate)}
                      className="text-slate-400 hover:text-amber-500"
                      title="پخش صدای جمله"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  item.isUser
                    ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 font-medium rounded-tl-none border border-slate-200'
                }`}>
                  {item.text}
                </div>

                {item.feedback && (
                  <div className={`p-2.5 rounded-xl text-xs font-bold leading-relaxed ${
                    item.isOptimal 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    💡 {item.feedback}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Choices */}
        <div className="pt-4 border-t border-slate-100">
          {!scenarioFinished ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-600 block">
                پاسخ پیشنهادی شما:
              </span>

              <div className="space-y-2">
                {currentStep.choices.map((choice, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-right p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 shadow-sm"
                  >
                    <span>{choice.text}</span>
                    <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-3 bg-emerald-50 border border-emerald-300 rounded-2xl">
              <div className="text-3xl">👏☕</div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                مکالمه با موفقیت به پایان رسید!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
                شما ۳۵ سکه لینگو پاداش گرفتید. تکرار منظم این مکالمات، مکالمه روزمره شما را کاملاً روان و طبیعی می‌کند.
              </p>
              <button
                onClick={handleRestart}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
              >
                تکرار مجدد مکالمه
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
