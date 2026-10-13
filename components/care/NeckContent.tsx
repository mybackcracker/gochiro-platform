import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export function NeckSummary() {
  return <section aria-labelledby="neck-summary" className="mt-6 rounded-xl bg-cream p-5 sm:p-6">
    <h2 id="neck-summary" className="font-heading text-xl font-bold text-navy">Neck Pain at a Glance</h2>
    <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-ink">
      <li>A stiff neck, tight shoulders, or difficulty turning your head can interfere with driving, working, and sleep.</li>
      <li>Shoulder and upper-back discomfort, some headaches, and arm symptoms may warrant checking the neck.</li>
      <li>Care may combine adjustments, soft tissue work, and practical movement or exercise guidance.</li>
      <li>Dr. DeFries brings the examination and care to your location, with attention to your daily activities and goals.</li>
    </ul>
    <Link href="#understanding-neck-pain" className="mt-4 inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4">Read more about neck pain ↓</Link>
  </section>;
}

export function NeckDetails() {
  return <section id="understanding-neck-pain" className="mt-12 scroll-mt-28 border-t border-line pt-9">
    <h2 className="font-heading text-2xl font-bold text-navy">Understanding Your Neck Pain</h2>
    <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-ink">
      <p>Neck pain does not always start with an injury. You might notice stiffness when looking over your shoulder, an ache after a day at your desk, or tension that makes it hard to get comfortable at night. Repeated tasks, long periods in one position, and past injuries can all be part of the picture.</p>
      <p>The neck, shoulder blades, and upper back work together as you reach, lift, and turn. Discomfort may involve more than one area. Irritation of a nerve in the neck can also produce pain, tingling, or numbness farther down the arm. An examination helps distinguish those symptoms from a local shoulder, elbow, or hand problem.</p>
      <h3 className="font-heading text-xl font-bold text-navy">Why we pay attention to your neck</h3>
      <p>Neck posture and movement are important parts of your overall examination. Some shoulder and arm symptoms can originate in the neck.</p>
      <p>In his clinical experience, Dr. DeFries has often observed that improving neck movement accompanies decreased shoulder, arm, or back discomfort—and sometimes improvement in hip, knee, or ankle symptoms. Your examination considers these possible connections while assessing each painful area individually. Care focuses on your findings, movement, and goals.</p>
      <p>Care focuses on more comfortable movement and everyday function. Depending on your findings, it may include hands-on or instrument-assisted adjustments, soft tissue care, exercises, postural retraining, and changes to activities that aggravate symptoms. Home guidance supports continued mobility and wellness between visits.</p>
    </div>
  </section>;
}

const faqs = [
  ["Why does my neck hurt if I have not injured it?", "Neck discomfort can develop gradually. Repeated movements, prolonged positioning, muscle tension, and changes in joints or discs may contribute. Your history and examination help identify what deserves attention."],
  ["Can neck problems cause shoulder pain or headaches?", "They can contribute to shoulder or upper-back discomfort and some headaches. These symptoms also have other causes. Dr. DeFries checks how your neck moves and considers the pattern of your symptoms before recommending care."],
  ["Could tingling in my hand come from my neck?", "Sometimes. An irritated nerve in the neck can cause symptoms in the arm or hand, but nerves can also be affected elsewhere. Tell Dr. DeFries about numbness, tingling, or weakness. New or worsening weakness needs prompt medical evaluation."],
  ["What can I change at my desk or while using my phone?", "Try changing position regularly and bringing the screen closer to a comfortable viewing height. Short movement breaks may be easier to maintain than trying to hold one perfect posture. During a home or workplace visit, Dr. DeFries can discuss your actual setup."],
  ["Should I change my pillow or use heat or ice?", "A pillow that supports your neck comfortably without tipping your head far to one side may help. Heat or cold may provide short-term comfort; use a cloth barrier and avoid extremes of temperature. Gentle movement within comfort is usually preferable to holding the neck still all day. Individual guidance depends on your symptoms."],
  ["Do I need an X-ray or MRI before a visit?", "Not everyone needs imaging. Your symptoms, medical history, and examination guide whether an X-ray, MRI, or another evaluation would be useful. Bring any existing reports you have."],
  ["Do all neck visits include a manual adjustment?", "No. Care is selected after your examination and discussion of your comfort and preferences. Options may include manual or instrument-assisted adjustments, soft tissue work, movement guidance, and exercise."],
  ["How long does it take to improve?", "It varies with the cause, how long symptoms have been present, your daily demands, and your response to care. Progress is assessed through comfort, movement, and activities such as driving, working, and sleeping, with the plan adjusted as needed."],
];

export function NeckFAQs() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }}/><section aria-labelledby="neck-faqs" className="mt-10 border-t border-line pt-9">
    <h2 id="neck-faqs" className="font-heading text-2xl font-bold text-navy">Common Questions About Neck Pain</h2>
    <div className="mt-5 max-w-3xl divide-y divide-line">{faqs.map(([question, answer]) => <details key={question} className="group py-4">
      <summary className="cursor-pointer py-2 font-semibold text-navy focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary>
      <p className="mt-3 text-base leading-relaxed text-ink">{answer}</p>
    </details>)}</div>
  </section></>;
}
