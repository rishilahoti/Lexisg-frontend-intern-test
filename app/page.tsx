"use client";
import { BorderBeam } from '@/components/Button';
import React, { useState, useRef, useEffect } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
    citations?: Citation[];
};

type Citation = {
    text: string;
    source: string;
    link: string;
    paragraph: number;
};

type Paragraph = {
    id: number;
    text: string;
};

export const Home= () => {
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [highlightedPara, setHighlightedPara] = useState<number | null>(null);
    const paraRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

    const mockResponse = {
        answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
        citations: [
            {
                text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
                source: "Dani_Devi_v_Pritam_Singh.pdf",
                link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
                paragraph: 7,
            }
        ]
    };

    const mockDocumentContent: Paragraph[] = [
        { id: 1, text: "Mr. Harkesh Manuja, J. - By way of present appeal, the appellants have questioned the adequacy of compensation awarded by the learned Motor Accident Claims Tribunal, Jind, for short 'the Tribunal', vide its award dated 03.04.2012. " },
        {
            id: 2, text: "The facts, in brief, are that on 23.06.2011 the deceased (Hawa Singh) was going to his Village Jajanwala from Village Prabhuwala on bicycle, followed by his son Balwinder Singh on a separate bicycle.When the deceased reached near Gupta Brick Kiln, a jeep bearing registration No.HR - 31 - A-0426 being driven by respondent No.1 in a rash and negligent manner came from behind and struck the bicycle of deceased.As a result thereof, Hawa Singh fell down and suffered multiple grievous injuries.The deceased was shifted to General Hospital, Narwana, but he succumbed to the injuries on the way. "
        },
        { id: 3, text: "On account of the death of Hawa Singh, his dependants filed claim petition before the learned Tribunal. Learned Tribunal allowed the same and assessed the annual income of the deceased as Rs.21,600/- and after applying the multiplier of 10, calculated the total dependency of the claimants as Rs.2,16,000/- (Rs.21,600 x 10). It would be appropriate to mention here that as both the sons of the deceased being major were not found to be dependants upon their deceased father, therefore, learned Tribunal applied deduction @ 50% from the annual income of the deceased. Apart from that, Rs.10000/- was awarded towards funeral, transportation and consortium, therefore, the claimants were held to be entitled for a total compensation of Rs.2,26,000/- along with interest @ 9% per annum from the date of institution of the petition till its realization. " },
        { id: 4, text: "In the present appeal, the appellants/ claimants have sought enhancement of compensation." },
        { id: 5, text: " Learned counsel for both the parties are ad idem that there is no dispute regarding the annual income as well as deduction. However, learned counsel for the claimants/appellants argues that while assessing the annual income, future prospects in view of the judgment of Hon'ble Supreme Court in National Insurance Company Ltd. v. Pranay Sethi and others, 2017 (4) RCR (Civil) 1009 has not been awarded and even the multiplier of 11 needs to be applied. Learned counsel for the appellants further contends that only Rs.10,000/- has been awarded towards funeral, transportation and consortium and no compensation has been awarded under the other conventional heads. Though, present appeal has been filed on behalf of sons of deceased as well, however, in view of the finding of the learned Tribunal, counsel for the claimants/ appellants has not pressed the issue regarding their dependency." },
        { id: 6, text: "Learned counsel for respondent No.1 submits that compensation awarded by the learned Tribunal is just and fair and therefore, no interference is warranted. " },
        {
            id: 7,
            text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        },
        { id: 8, text: "Besides this, with respect to the compensation awarded under the other conventional heads as well as multiplier, applying the principles of law laid down by Hon'ble Supreme Court in Pranay Sethi's case(supra) and in Smt. Sarla Verma and others v. Delhi Transport Corporation and another, 2009 (3) RCR (Civil) 77, the claimant are entitled for Rs.16,500/- as compensation under the head of funeral expenses, loss of consortium (spousal) is to be awarded to the tune of Rs.44,000/- and Rs.16,500/- towards loss of estate by applying 10% increase under the conventional heads. And multiplier of '11' has to be made applicable instead of '10'. " },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setIsLoading(true);
        setMessages(prev => [
            ...prev,
            { role: 'user', content: inputText },
            { role: 'assistant', content: '', citations: [] }
        ]);
        setInputText('');

        setTimeout(() => {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: mockResponse.answer,
                    citations: mockResponse.citations
                };
                return newMessages;
            });
            setIsLoading(false);
        }, 1500);
    };

    const handleCitationClick = (citation: Citation) => {
        setHighlightedPara(citation.paragraph);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (highlightedPara !== null && paraRefs.current[highlightedPara]) {
            paraRefs.current[highlightedPara]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [highlightedPara, isModalOpen]);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: "radial-gradient(35% 25% at 50% 60.9%, rgba(80,176,250,0.05) 0%, rgba(64, 140, 199, 0.085) 36.49%, rgb(10,10,10) 100%)"
            }}
        >
            <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card backdrop-blur bg-transparent">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                    Lexi Legal Assistant
                </h1>
            </header>
            <div className="flex-1 overflow-y-auto p-4 pb-20">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-3xl mx-auto mb-4 p-4 rounded-xl ${msg.role === 'user'
                            ? 'shadow-inner bg-opacity-15 my-5 mx-auto border border-secondary rounded-2xl bg-card backdrop-blur bg-[#18181bb9]'
                            : 'shadow-inner bg-opacity-15 mx-auto border border-secondary rounded-2xl bg-card backdrop-blur bg-[#0f172b4f]'
                            }`}
                    >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        {msg.citations && msg.citations.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <h3 className="font-bold bg-gradient-to-r from-white  to-[#70BEFA]  bg-clip-text text-transparent mb-2">Citations:</h3>
                                {msg.citations.map((citation, idx) => (
                                    <div
                                        key={idx}
                                        className="mb-2 p-3 bg-[#27272a40] rounded-lg cursor-pointer"
                                        onClick={() => handleCitationClick(citation)}
                                    >
                                        <div className="text-sm">&quot;{citation.text}&quot;</div>
                                        <div className="mt-1 text-xs w-fit text-red-400 hover:text-blue-600 font-medium">
                                            Source: {citation.source}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="max-w-3xl mb-4 p-4 shadow-inner bg-opacity-15 mx-auto border border-secondary rounded-2xl bg-card backdrop-blur bg-[#0f172b4f]">
                        <div className="flex items-center">
                            <div className="h-2 w-2 bg-gradient-to-r from-white to-[#70BEFA] rounded-full mr-1 animate-bounce"></div>
                            <div
                                className="h-2 w-2 bg-gradient-to-r from-white to-[#70BEFA] rounded-full mr-1 animate-bounce"
                                style={{ animationDelay: '0.2s' }}
                            ></div>
                            <div
                                className="h-2 w-2 bg-gradient-to-r from-white to-[#70BEFA] rounded-full animate-bounce"
                                style={{ animationDelay: '0.4s' }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className="fixed bottom-5 left-0 right-0 "
            >
                <div className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto p-2 border border-secondary rounded-2xl bg-card backdrop-blur bg-transparent flex">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask a legal question"
                        className="flex-1 rounded-l-xl p-3 resize-none ring-1 focus:outline-none focus:ring-1 focus:ring-[#70BEFA]"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        type="submit" disabled={isLoading || !inputText.trim()}
                        className={`bg-[#4db2ff] px-6 rounded-r-xl font-medium ring-1 ${isLoading || !inputText.trim()
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#446883] hover:ring-[#70BEFA]'
                            }`}
                    >
                        Ask
                    </button>
                    <BorderBeam size={100} duration={18} />
                </div>
            </form>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                    <div className="bg-card backdrop-blur bg-[#0f172b4f] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-bold text-lg">Document Preview</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6">
                            <div className="prose max-w-none">
                                <h4 className="font-bold mb-4">Dani Devi v. Pritam Singh Judgment Excerpts</h4>

                                {mockDocumentContent.map((para) => (
                                    <p
                                        key={para.id}
                                        ref={el => { paraRefs.current[para.id] = el; }}
                                        className={`mb-3 p-2 rounded ${highlightedPara === para.id
                                            ? 'bg-amber-300 text-slate-800 border-l-4 border-yellow-500'
                                            : 'hover:bg-gray-800'
                                            }`}
                                    >
                                        <span className="text-md inline-block w-5">
                                            {para.id}.
                                        </span>
                                        {para.text}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 border-t flex justify-end">
                            <a
                                href={mockResponse.citations[0].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
                            >
                                Open PDF
                            </a>
                        </div>
                        <BorderBeam size={100} duration={18} />
                    </div>
                </div>
            )}
        </div>
    );
}
export default Home;
