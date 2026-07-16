---
name: dostoevsky-trivia
description: >-
  Collect verified Dostoevsky facts and anecdotes, then craft engaging trivia
  questions with plausible distractor answers for the dos-quiz mini-program.
  Use when the user says "收集陀氏问答", "出几道陀翁趣味题", "dostoevsky trivia",
  "陀思妥耶夫斯基冷知识", "出题", or asks to expand the quiz with author-level
  questions about Dostoevsky's life, works, or historical context.
---

# Dostoevsky Trivia Collector

Collect verified facts about Fyodor Dostoevsky and turn them into engaging
trivia questions with misleading distractor answers.

## Workflow

### Step 1: Collect Facts

Gather facts and anecdotes about Dostoevsky from multiple angles:

- **Biographical**: birth, family, education, exile, gambling, epilepsy, death
- **Literary**: publication dates, serialization history, reception, influences
- **Anecdotal**: the mock execution, the gambling streaks, the second wife,
  the Pushkin speech, the debts, the travels
- **Historical context**: tsarist Russia, the Petrashevsky Circle, Siberia

For each fact, record:
```
fact: one-sentence statement
category: biographical | literary | anecdotal | historical
date: year or range (if applicable)
sources: [list of 2+ independent sources]
confidence: high | medium
```

### Step 2: Multi-Source Verification

**Every fact must be confirmed by at least 2 independent, reliable sources.**

Acceptable sources:
- Academic biographies (Joseph Frank, etc.)
- University press publications
- Encyclopaedia Britannica / reliable encyclopedias
- Primary sources (Dostoevsky's letters, diaries, contemporary accounts)

Unacceptable as sole source:
- Wikipedia (use as starting point, not final confirmation)
- Blog posts without citations
- AI-generated content
- Single-source claims

If a fact cannot be confirmed by 2+ sources, mark it `confidence: medium`
and note what is unverified. Do not use it for questions unless the user
explicitly accepts medium-confidence facts.

### Step 3: Design Questions

For each verified fact, design a trivia question:

```
{
  id: "trivia-001",
  category: "biographical",
  question: "clear, specific, one-sentence question",
  correctAnswer: "the verified fact",
  distractors: ["plausible but wrong", "plausible but wrong", "plausible but wrong"],
  explanation: "why the correct answer is right, with source attribution",
  difficulty: easy | medium | hard
}
```

### Step 4: Design Distractors (迷惑性答案)

Good distractors are:
- **Plausible**: use real names, dates, places from Dostoevsky's world
- **Tempting**: close to the truth but verifiably wrong
- **Educational**: even the wrong answer teaches something

Distractor techniques:
- **Date shift**: correct is 1849, distractor is 1847 or 1851
- **Work swap**: attribute a Tolstoy/Turgenev quote to Dostoevsky
- **Character swap**: name a character from a different novel
- **Role reversal**: swap who did what (e.g., who saved whom)
- **Real vs fictional**: mix a real historical event with a fictional one

Bad distractors (avoid):
- Obviously wrong or absurd
- Too similar to each other
- Requires obscure knowledge to eliminate
- Ambiguous (could be argued correct)

### Step 5: Output Format

Output collected questions as a structured list:

```markdown
## 陀思妥耶夫斯基趣味问答

### Q1 [biographical | medium]

**问：** 陀思妥耶夫斯基因参与哪个政治团体而被捕并判处死刑（后改判流放）？

- A. 十二月党人
- B. 彼得拉舍夫斯基小组 ✓
- C. 民意党
- D. 土地与自由社

**解析：** 1849 年陀思妥耶夫斯基因参与彼得拉舍夫斯基小组的集会被捕，被判死刑，在刑场上经历假执行后改判西伯利亚流放。（来源：Joseph Frank《陀思妥耶夫斯基》卷一；Britannica）

---

### Q2 ...
```

Mark correct answer with ✓. Include sources in the explanation.

## Quality Checklist

Before outputting:
- [ ] Every fact has 2+ independent sources
- [ ] Distractors are plausible but unambiguously wrong
- [ ] Questions are clear and unambiguous
- [ ] Explanations cite sources
- [ ] Difficulty is labeled
- [ ] No duplicate questions
- [ ] Mix of categories (not all biographical)

## Integration with dos-quiz

If the user wants to add these to the mini-program:
- Trivia questions go in `workshop/question/trivia/` (not main package)
- Format should match `miniprogram/utils/questions-data.js` structure if
  they are to be used as quiz questions
- Author-level trivia is separate from character-personality questions
- Confirm with user before writing to any file

## Tone

Questions should be:
- Engaging and curious, not dry academic
- In Chinese (unless user asks for English)
- Respectful of the literary tradition
- Fun but not frivolous
