This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Citation Linking


https://github.com/user-attachments/assets/16981b8a-51d4-446b-999f-022e20e3182d


### 1. Citation Display

Citations appear as interactive cards below the answer:

```tsx
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
```

### 2. Click Handling

Clicking a citation highlights the relevant paragraph and opens a modal:

```tsx
const handleCitationClick = (citation: Citation) => {
	setHighlightedPara(citation.paragraph); // Highlight paragraph
	setIsModalOpen(true); // Show modal
};
```

### 3. PDF Preview Modal

A modal overlays the page to preview the document:

```tsx
{
	isModalOpen && (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
			Modal
		</div>
	);
}
```

### 4. Paragraph Highlighting & Scrolling

**a. Paragraph References**

Create refs for each paragraph to enable scrolling and highlighting:

```tsx
const paraRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

{
	mockDocumentContent.map((para) => (
		<p
			key={para.id}
			ref={(el) => (paraRefs.current[para.id] = el)}
			className={highlightedPara === para.id ? 'highlighted' : ''}
		>
			{para.text}
		</p>
	));
}
```

**b. Automatic Scrolling**

Scroll to the highlighted paragraph when the modal opens:

```tsx
useEffect(() => {
	if (highlightedPara && paraRefs.current[highlightedPara]) {
		paraRefs.current[highlightedPara]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}
}, [highlightedPara, isModalOpen]);
```

**c. Visual Highlighting**

Apply styles to highlight the active paragraph:

```tsx
className={`mb-3 p-2 rounded ${
    highlightedPara === para.id
        ? 'bg-amber-300 text-slate-800 border-l-4 border-yellow-500'
        : 'hover:bg-gray-800'
}`}
```

### 5. PDF Linking

The modal includes a button to open the original PDF:

```tsx
<a
	href={mockResponse.citations[0].link}
	target="_blank"
	rel="noopener noreferrer"
	className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
>
	Open PDF
</a>
```

---

#### Key Simulation Aspects

-   **Mock Document Content:**

    ```tsx
    const mockDocumentContent = [
    	{ id: 1, text: 'Paragraph 1...' },
    	// ...
    	{ id: 7, text: 'Relevant text...' },
    	// ...
    ];
    ```

-   **Citation Metadata:**

    ```tsx
    type Citation = {
    	text: string;
    	source: string;
    	link: string;
    	paragraph: number;
    };

    citations: [
    	{
    		text: 'as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.',
    		source: 'Dani_Devi_v_Pritam_Singh.pdf',
    		link: 'https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz',
    		paragraph: 7,
    	},
    ];
    ```

-   **Visual Feedback:**
    -   Yellow background and left border for highlighted paragraphs
    -   Smooth scrolling animation
    -   Hover effects on citation cards
    -   Modal backdrop for focus

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
