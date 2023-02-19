import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const summarize = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize in 150 to 200 words:\n\n${text}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
};

console.log(
  await summarize(`
EXETER, N.H. — According to Nikki Haley, bullies are best subdued by a counter kick — in heels. Achieving a new vision for the country requires the leadership of a “tough-as-nails woman.” And generational change starts with putting a “badass woman in the White House.”

In ways both overt and subtle, Ms. Haley, the former United Nations ambassador and South Carolina governor, is setting up her 2024 presidential bid as the latest test of the Republican Party’s attitudes about female leaders. No woman has ever won a state Republican presidential primary, let alone the party’s nomination — and Ms. Haley is the first one to mount a bid since former President Donald J. Trump, who regularly attacked women in extraordinarily graphic and vulgar terms, rose to the head of the party.

The early days of Ms. Haley’s campaign, which she announced on Tuesday, quickly illustrated the challenges facing Republican women. For decades, female leaders in both parties have struggled with what political scientists call the double bind — the difficulty of proving one’s strength and competence, while meeting voters’ expectations of warmth, or of being “likable enough,” as former President Barack Obama once said of Hillary Clinton during a 2008 primary debate.

But for Republican women, that double bind comes with a twist. There are conservative voters who harbor traditional views about femininity while expecting their candidates to seem “tough.” Several strategists suggested Republican primary voters would have little patience if a female candidate were to level accusations of sexism toward another Republican. And Mr. Trump, who remains a powerful figure in the party and is running again, has already attacked Ms. Haley with criticism some view as gendered.

Even before she entered the race, Mr. Trump dismissed Ms. Haley as “overly ambitious,” which struck some observers as sexist. And soon after her official announcement, he suggested her appointment as U.N. ambassador was less a reflection of her credentials than of his desire to see her male lieutenant governor take over as governor.  She also confronted a male CNN anchor, who asserted that Ms. Haley and women her age — 51, decades younger than Mr. Trump or President Biden — were past their “prime.”

Ms. Haley, who could be joined by other female contenders, including Gov. Kristi Noem of South Dakota, is operating within a G.O.P. that has often dismissed debate about identity as the purview of the left, and has, in many corners, increasingly lambasted discussions of gender and race as “wokeness.”

During her campaign trail debut this past week, Ms. Haley played into this trend, promoting a country that is “strong and proud, not weak and woke.” And while she winked at the history-making potential of her candidacy — “I will simply say this: May the best woman win” — she was quick to distance herself from “identity politics.”

“I don’t believe in that. And I don’t believe in glass ceilings, either. I believe in creating a country where anyone can do anything,” she said Wednesday while campaigning in Charleston, S.C.

Editors’ Picks

What Dentists Wish You Knew

They Lost Their Jobs, Then Went Viral on TikTok

Beauty in the Aftermath
Continue reading the main story
Ms. Haley faces many hurdles that have nothing to do with gender. Mr. Trump and Gov. Ron DeSantis of Florida, who is generally seen as Mr. Trump’s strongest potential adversary, lead her significantly in early polling. And her occasional criticisms of Mr. Trump, after serving in his administration and often heaping praise on him, may leave her ill-defined in the eyes of voters.
Many of the most prominent women in the party — Representative Marjorie Taylor Greene, a conspiracy theory-minded Republican from Georgia; Ronna McDaniel, the chair of the Republican National Committee; Representative Elise Stefanik of New York, the chair of the House Republican conference — have risen by emulating or embracing Mr. Trump’s hard-right politics, not by challenging him.

“If you want to know, what do you have to do to be an influential woman in the G.O.P. today, compare Marjorie Taylor Greene to Liz Cheney,” said Jennifer Horn, the former chair of the New Hampshire Republican Party who now considers herself an independent. “Which one of them actually brings gravitas and experience and genuine commitment to democracy to the table? And which one of them is currently serving in Congress?”
(Ms. Cheney, a sharp Trump critic who lost her congressional primary last year, could also seek the presidency, though she would have a difficult road in the current Republican Party. “These days, for the most part, men are running the world,” Ms. Cheney said in a speech last summer. “It is really not going that well.”)

Asked for comment, Ms. Greene said that Ms. Horn, Ms. Cheney and Ms. Haley did not “represent the current Republican Party.”

Juliana Bergeron, the New Hampshire Republican national committeewoman, said she saw Ms. Haley as a credible candidate.

But, she said: “There are people in our party that want to put women back into the 1960s, and so therefore I think it makes it somewhat more difficult for women in our party. And I wish I didn’t have to say that, but that’s how I feel.”
Some Republicans see female candidates as their party’s best messengers on issues like abortion or supporting more parental involvement in schools — which could bolster a woman’s chance of getting on the G.O.P. ticket — even as many stress that they don’t factor gender into their political decisions.

“Conservative women will not vote based on gender,” said Penny Nance, chief executive of Concerned Women for America, an organization that opposes abortion rights.  
Those sentiments were easy to find at a Haley campaign event inside the town hall in Exeter, N.H., on Thursday night.

“You want the best person for the job,” said Susan Ford, 67, who said that Ms. Haley’s gender was not a reason to vote for her, but that she was impressed by her experience. Asked if she believed the country was ready for a woman as president, she replied, “Yeah, if it’s the right one.”

Kathryn Job, who said she was a political independent in her 70s, was less sure that a female candidate could win.

“I don’t think that we’ve gotten past that yet,” said Ms. Job. “There’s still a bias.”

Voters in both parties overwhelmingly tell pollsters they would vote for a woman for president, and a 2019 Gallup poll found that Democrats were only slightly more likely than Republicans to say they would do so. But there are signs that Republicans are less likely to see being a woman as an advantage. A recent USA Today/Suffolk University poll found that among voters who expressed a gender preference for their presidential candidates, Republican women were far more likely to prefer a man.
`)
);
