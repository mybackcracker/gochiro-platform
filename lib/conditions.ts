export type MobilityIcon = "bend" | "turn" | "reach" | "grip" | "walk";
export type ConditionContent = {
  title: string; slug: string; intro: string; contributing: string;
  symptoms: string[]; care: string; home: string; safety: string;
  related: string[]; mobilityLabel: string; activity: string;
  mobilityIcon: MobilityIcon; heroTitle: string; description: string;
};

// Informational copy, not an individual treatment plan. Related links do not establish causation.
export const CONDITIONS: ConditionContent[] = [
  {
    "title": "Low Back Pain",
    "slug": "low-back-pain",
    "intro": "Low back pain can make sitting, bending, walking, sleeping, or getting through the workday uncomfortable.",
    "contributing": "Low back pain can involve muscles, joints, discs, or irritated nerves. It may begin after lifting or an injury, develop gradually with repeated activity, or recur without an obvious trigger. Where you feel pain does not always identify its source.",
    "symptoms": [
      "Buttock or hip discomfort",
      "Pain traveling into the leg",
      "Tingling or numbness in the leg or foot",
      "Stiffness when changing positions",
      "Mid-back or neck discomfort"
    ],
    "care": "Dr. DeFries evaluates your movement, joint function, muscles, and relevant nerve findings. Care may include chiropractic adjustments, soft tissue therapies, and education about proper movement. Exercises or other therapies may be added based on your needs. The goals are to decrease pain, improve mobility, and help you return to everyday activities more comfortably.",
    "home": "Your usual chair, workspace, and lifting habits provide opportunities for practical guidance. Home exercises can support ongoing mobility between visits.",
    "safety": "New difficulty controlling your bladder or bowels, difficulty urinating, numbness around the groin or saddle area, or rapidly worsening leg weakness requires immediate medical evaluation.",
    "related": [
      "knee-pain",
      "hip-pain",
      "neck-pain",
      "ankle-foot-pain"
    ],
    "mobilityLabel": "Bend and move more easily",
    "activity": "Work toward everyday activities such as walking, lifting, getting dressed, and sleeping more comfortably.",
    "mobilityIcon": "bend",
    "heroTitle": "Less back pain. More of your life.",
    "description": "Low Back Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Neck Pain",
    "slug": "neck-pain",
    "intro": "Neck pain and stiffness can make turning your head, working at a computer, driving, or sleeping uncomfortable.",
    "contributing": "Neck pain may involve muscles, joints, discs, or irritated nerves. Past injuries, repetitive activity, and prolonged positioning may contribute to symptoms. Your examination helps determine what is affecting your movement.",
    "symptoms": [
      "Upper back or shoulder discomfort",
      "Headaches",
      "Pain traveling into the arm",
      "Tingling or numbness in the hand or fingers",
      "Low back discomfort"
    ],
    "care": "Dr. DeFries evaluates joint movement, muscle function, and relevant nerve findings. Care may include chiropractic adjustments, soft tissue therapies, and education about proper movement. Adjustments may be performed by hand or with a specialized adjusting instrument, depending on your findings, comfort, and preferences. Exercises and postural retraining may also support your care.",
    "home": "An onsite visit provides an opportunity to discuss your usual desk, chair, and daily activities. You may receive movement guidance and home exercises.",
    "safety": "New or worsening arm or leg weakness, difficulty walking, or loss of balance requires urgent evaluation. Sudden severe neck pain or headache with changes in vision, speech, or facial sensation requires emergency evaluation.",
    "related": [
      "upper-back-pain",
      "shoulder-pain",
      "headaches",
      "wrist-hand-pain"
    ],
    "mobilityLabel": "Turn and move more easily",
    "activity": "Work toward turning your head, driving, working, and sleeping more comfortably.",
    "mobilityIcon": "turn",
    "heroTitle": "Neck Pain",
    "description": "Neck Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Upper Back Pain",
    "slug": "upper-back-pain",
    "intro": "Discomfort between the shoulder blades or across the upper back can make working, reaching, turning, or sitting for long periods uncomfortable.",
    "contributing": "Upper back pain may involve muscles and joints of the mid-back, ribs, or nearby areas. Repetitive activity, prolonged positioning, lifting, and past injuries may contribute. Dr. DeFries examines how these areas move and work together.",
    "symptoms": [
      "Neck pain or stiffness",
      "Shoulder discomfort",
      "Low back pain",
      "Tightness around the shoulder blades"
    ],
    "care": "Care may include chiropractic adjustments, soft tissue therapies, and education about proper movement. Exercises and postural retraining may improve mobility, muscle coordination, and tolerance for everyday activity. Treatment is selected based on your examination findings, comfort, and goals.",
    "home": "Your workspace and daily activities provide context for positioning changes, movement breaks, and home exercises.",
    "safety": "Upper back pain accompanied by chest pressure, shortness of breath, fainting, or sudden severe symptoms requires emergency medical evaluation.",
    "related": [
      "neck-pain",
      "shoulder-pain",
      "low-back-pain",
      "elbow-pain"
    ],
    "mobilityLabel": "Reach and turn more easily",
    "activity": "Work toward reaching, sitting, and getting through your workday more comfortably.",
    "mobilityIcon": "reach",
    "heroTitle": "Upper Back Pain",
    "description": "Upper Back Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Shoulder Pain",
    "slug": "shoulder-pain",
    "intro": "Shoulder pain can make reaching overhead, lifting, getting dressed, or sleeping on your side uncomfortable.",
    "contributing": "Shoulder discomfort may involve joints, muscles, tendons, or nearby structures. It may develop after injury, repeated lifting, overhead activity, or changes in how you use your arm. Your examination considers the shoulder, shoulder blade, neck, and upper back.",
    "symptoms": [
      "Neck pain or stiffness",
      "Shoulder blade discomfort",
      "Pain extending into the upper arm",
      "Difficulty reaching",
      "Arm or hand tingling or numbness"
    ],
    "care": "Depending on your findings, care may include soft tissue therapies, joint manipulation or mobilization, and movement education. Exercises may focus on mobility, strength, and coordination between the arm and shoulder blade. Tingling or numbness warrants assessing possible nerve involvement rather than assuming the shoulder is the source.",
    "home": "Practice exercises and discuss ways to adapt daily tasks using your own surroundings. Home guidance supports comfortable movement between visits.",
    "safety": "Seek urgent evaluation for deformity, inability to use the arm after injury, or a hot swollen joint with fever. Shoulder or arm pain with chest pressure or shortness of breath requires emergency evaluation.",
    "related": [
      "neck-pain",
      "upper-back-pain",
      "elbow-pain",
      "wrist-hand-pain"
    ],
    "mobilityLabel": "Reach more comfortably",
    "activity": "Work toward lifting, getting dressed, and using your arm more comfortably.",
    "mobilityIcon": "reach",
    "heroTitle": "Shoulder Pain",
    "description": "Shoulder Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Elbow Pain",
    "slug": "elbow-pain",
    "intro": "Elbow pain can interfere with gripping, lifting, carrying bags, using tools, or working at a keyboard.",
    "contributing": "Repeated gripping and wrist movements may place demands on the forearm muscles and tendons around the elbow. Pain on the outside is sometimes called tennis elbow, while inner elbow pain is sometimes called golfer’s elbow. These names describe common patterns, but an examination is needed to identify the cause.",
    "symptoms": [
      "Forearm tightness",
      "Wrist or hand discomfort",
      "Pain with gripping",
      "Shoulder discomfort",
      "Tingling or numbness"
    ],
    "care": "Dr. DeFries evaluates elbow and wrist movement, muscle strength, grip-related symptoms, and relevant nerve findings. Care may include soft tissue therapies, appropriate joint treatment, and gradually progressed exercise. Guidance may address the amount and type of gripping or lifting you perform.",
    "home": "Your tools, work setup, or usual activities can help identify practical changes. Exercises are selected for your tolerance and adjusted as function improves.",
    "safety": "Seek urgent medical evaluation for a hot swollen elbow with fever, deformity after injury, or a sudden substantial loss of movement or strength.",
    "related": [
      "wrist-hand-pain",
      "shoulder-pain",
      "neck-pain",
      "repetitive-strain"
    ],
    "mobilityLabel": "Lift and grip more comfortably",
    "activity": "Work toward carrying bags, gripping tools, and performing daily tasks more comfortably.",
    "mobilityIcon": "grip",
    "heroTitle": "Elbow Pain",
    "description": "Elbow Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Wrist & Hand Pain",
    "slug": "wrist-hand-pain",
    "intro": "Wrist and hand discomfort can make typing, gripping, opening jars, or performing precise tasks difficult.",
    "contributing": "Symptoms may involve joints, tendons, muscles, or nerves. Repetitive tasks, injury, and sustained wrist positions can contribute. Carpal tunnel syndrome is one possible cause of tingling and numbness, but not every hand complaint is carpal tunnel.",
    "symptoms": [
      "Forearm or elbow discomfort",
      "Grip difficulty",
      "Finger stiffness",
      "Tingling or numbness",
      "Neck or shoulder symptoms"
    ],
    "care": "The examination considers wrist and finger movement, grip, tendon loading, and relevant nerve findings. Dr. DeFries may also assess the elbow, shoulder, and neck when appropriate. Care may include soft tissue treatment, appropriate joint treatment, movement guidance, and targeted exercises. Nerve symptoms may require additional medical evaluation.",
    "home": "Guidance may include adapting repetitive tasks and practicing exercises with careful attention to symptoms. Persistent numbness should not be ignored simply because pain is mild.",
    "safety": "Arrange prompt medical evaluation for progressive weakness, persistent loss of sensation, or loss of hand function. Injury with deformity or a cold, pale hand requires urgent evaluation.",
    "related": [
      "elbow-pain",
      "shoulder-pain",
      "neck-pain",
      "repetitive-strain"
    ],
    "mobilityLabel": "Use your hands more comfortably",
    "activity": "Work toward typing, gripping, and performing everyday hand tasks more comfortably.",
    "mobilityIcon": "grip",
    "heroTitle": "Wrist & Hand Pain",
    "description": "Wrist & Hand Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Hip Pain",
    "slug": "hip-pain",
    "intro": "Hip pain can affect walking, climbing stairs, getting out of a chair, or sleeping comfortably.",
    "contributing": "Pain around the hip can involve the joint, surrounding muscles and tendons, or symptoms referred from another area. Groin, outer hip, and buttock pain can have different causes. The examination helps distinguish these patterns.",
    "symptoms": [
      "Low back discomfort",
      "Buttock pain",
      "Knee discomfort",
      "Stiffness after sitting",
      "Changes in walking"
    ],
    "care": "Dr. DeFries assesses hip movement, muscle function, walking, and the low back when relevant. Depending on your findings, care may include soft tissue therapies, appropriate joint treatment, and exercises for strength and movement control. The goals are more comfortable movement and better tolerance for everyday activity.",
    "home": "Your stairs, seating, and daily walking routine can guide practical changes and exercises. We assess progress in activities important to you.",
    "safety": "Seek urgent evaluation if you cannot bear weight after an injury, have severe sudden hip pain, or have a hot swollen joint with fever.",
    "related": [
      "low-back-pain",
      "knee-pain",
      "ankle-foot-pain",
      "sciatica"
    ],
    "mobilityLabel": "Walk and move more easily",
    "activity": "Work toward walking, climbing stairs, and getting up from a chair more comfortably.",
    "mobilityIcon": "walk",
    "heroTitle": "Hip Pain",
    "description": "Hip Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Knee Pain",
    "slug": "knee-pain",
    "intro": "Knee pain can make stairs, walking, kneeling, or getting up from a chair difficult.",
    "contributing": "Symptoms may involve the joint, muscles, tendons, or other structures. Previous injury, repetitive loading, and arthritis may contribute. Hip and ankle movement may also be relevant to how you load the knee.",
    "symptoms": [
      "Hip or ankle discomfort",
      "Stiffness",
      "Difficulty with stairs",
      "Changes in walking",
      "Low back discomfort"
    ],
    "care": "Dr. DeFries assesses knee mobility, strength, swelling, and functional movements. Care may include soft tissue therapies, appropriate joint treatment, and exercises for strength, balance, and control. Loading is adjusted to your findings and tolerance. A locking or unstable knee may need additional assessment.",
    "home": "Exercises may use your own chair or stairs when appropriate. Guidance focuses on gradually improving the activities you need to perform.",
    "safety": "A hot swollen knee with fever, substantial swelling after injury, deformity, or inability to bear weight requires urgent evaluation.",
    "related": [
      "hip-pain",
      "ankle-foot-pain",
      "low-back-pain",
      "repetitive-strain"
    ],
    "mobilityLabel": "Walk and climb more easily",
    "activity": "Work toward walking, using stairs, and standing up more comfortably.",
    "mobilityIcon": "walk",
    "heroTitle": "Knee Pain",
    "description": "Knee Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Ankle & Foot Pain",
    "slug": "ankle-foot-pain",
    "intro": "Ankle or foot pain can limit walking, standing, balance, and confidence on uneven ground.",
    "contributing": "Symptoms may follow a sprain, repeated activity, or changes in physical demands. Joints, muscles, tendons, and other tissues may be involved. Heel pain, ankle stiffness, and pain around the arch warrant different assessments.",
    "symptoms": [
      "Calf tightness",
      "Knee or hip discomfort",
      "Changes in walking",
      "Difficulty balancing",
      "Low back discomfort"
    ],
    "care": "The examination considers movement, strength, balance, and walking. Dr. DeFries may also assess the knee and hip when relevant. Care may include soft tissue therapies, appropriate joint treatment, and progressive exercises. Rehabilitation may focus on restoring confidence and control after an old ankle injury.",
    "home": "Footwear, walking demands, and available space for exercise help shape practical recommendations. The goal is improved function as well as symptom relief.",
    "safety": "Seek urgent evaluation for deformity, inability to bear weight after injury, or a hot swollen joint with fever. A cold or discolored foot or sudden loss of sensation requires urgent medical attention.",
    "related": [
      "knee-pain",
      "hip-pain",
      "low-back-pain",
      "repetitive-strain"
    ],
    "mobilityLabel": "Walk with greater confidence",
    "activity": "Work toward standing, walking, and balancing more comfortably.",
    "mobilityIcon": "walk",
    "heroTitle": "Ankle & Foot Pain",
    "description": "Ankle & Foot Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Sciatica & Radiating Leg Pain",
    "slug": "sciatica",
    "intro": "Pain traveling from the buttock into the leg can make sitting, walking, or sleeping difficult.",
    "contributing": "Sciatica describes symptoms associated with irritation or compression of nerves supplying the leg. It can include burning pain, tingling, numbness, or weakness. Not all leg pain is sciatica; the examination helps distinguish nerve-related symptoms from other causes.",
    "symptoms": [
      "Low back pain",
      "Buttock discomfort",
      "Tingling or numbness in the leg or foot",
      "Weakness",
      "Difficulty tolerating sitting"
    ],
    "care": "Dr. DeFries evaluates symptom patterns, movement, strength, sensation, and other relevant nerve findings. When conservative care is appropriate, treatment may combine movement guidance, targeted exercise, and selected manual therapies. Progressive weakness or other concerning findings may require referral rather than routine treatment.",
    "home": "Guidance focuses on tolerable activity and positions suited to your symptoms. Progress includes changes in leg symptoms and your ability to sit, walk, and function.",
    "safety": "Difficulty urinating, new loss of bladder or bowel control, numbness around the groin or saddle area, or severe or worsening symptoms in both legs requires emergency evaluation. New or progressing leg weakness needs prompt medical assessment.",
    "related": [
      "low-back-pain",
      "hip-pain",
      "knee-pain",
      "ankle-foot-pain"
    ],
    "mobilityLabel": "Move more comfortably",
    "activity": "Work toward walking, sitting, and tolerating everyday activity more comfortably.",
    "mobilityIcon": "walk",
    "heroTitle": "Sciatica & Radiating Leg Pain",
    "description": "Sciatica & Radiating Leg Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Headaches & Neck-Related Discomfort",
    "slug": "headaches",
    "intro": "Recurring headaches can disrupt concentration, work, sleep, and daily life. An evaluation can help determine whether neck-related factors deserve attention.",
    "contributing": "Headaches have many causes. Some originate from structures in the neck; others, including migraine, have different mechanisms. Neck pain occurring with a headache does not by itself establish the cause. Your history, headache pattern, and examination guide the next step.",
    "symptoms": [
      "Neck stiffness",
      "Upper back tension",
      "Shoulder discomfort",
      "Difficulty turning the head"
    ],
    "care": "Dr. DeFries assesses neck movement, muscle tenderness, relevant neurological findings, and your headache history. When a musculoskeletal contribution is identified, care may include appropriate manual therapy, soft tissue treatment, and movement guidance. Chiropractic care does not replace medical evaluation for new or concerning headaches.",
    "home": "Discuss your work setup and symptom patterns. Keeping a record of headache frequency, duration, and associated symptoms may help guide evaluation and follow-up.",
    "safety": "A sudden extremely severe headache, headache with weakness, confusion, vision loss, speech difficulty, or fever and marked neck stiffness requires emergency evaluation. New or changing headache patterns warrant medical assessment.",
    "related": [
      "neck-pain",
      "upper-back-pain",
      "shoulder-pain",
      "whiplash"
    ],
    "mobilityLabel": "Move your neck more comfortably",
    "activity": "When neck-related factors are present, work toward more comfortable movement, sleep, and everyday activity.",
    "mobilityIcon": "turn",
    "heroTitle": "Headaches & Neck-Related Discomfort",
    "description": "Headaches & Neck-Related Discomfort evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Whiplash & Accident-Related Pain",
    "slug": "whiplash",
    "intro": "After an accident, neck or back discomfort may affect sleep, driving, work, and ordinary movement. Symptoms may not be fully apparent immediately.",
    "contributing": "Rapid acceleration and deceleration can injure soft tissues around the neck. Other injuries may also occur, so an accident-related examination considers the event, symptoms, prior history, and any medical care already received.",
    "symptoms": [
      "Neck stiffness",
      "Upper back discomfort",
      "Headaches",
      "Shoulder pain",
      "Low back pain",
      "Arm symptoms"
    ],
    "care": "Dr. DeFries evaluates movement, muscle findings, and relevant neurological signs. When appropriate, care may combine selected manual techniques, soft tissue treatment, and gradually progressed exercise. Treatment is adapted to the stage of recovery and examination findings; additional medical assessment may be needed.",
    "home": "We work toward activities such as turning your head, sitting, and returning to usual tasks. Progress is reviewed through symptoms, examination findings, and functional ability.",
    "safety": "After an accident, severe neck pain, worsening weakness or numbness, difficulty walking, or signs of head injury require urgent medical assessment before routine chiropractic care.",
    "related": [
      "neck-pain",
      "upper-back-pain",
      "headaches",
      "low-back-pain"
    ],
    "mobilityLabel": "Regain comfortable movement",
    "activity": "Work toward turning your head, driving, and returning to daily activities at a suitable pace.",
    "mobilityIcon": "turn",
    "heroTitle": "Whiplash & Accident-Related Pain",
    "description": "Whiplash & Accident-Related Pain evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  },
  {
    "title": "Repetitive Strain & Work-Related Discomfort",
    "slug": "repetitive-strain",
    "intro": "Repeated lifting, gripping, reaching, or prolonged positioning can make everyday work increasingly uncomfortable.",
    "contributing": "Muscles and tendons may become painful when activity demands exceed current tolerance. Work-related discomfort can also involve joints or nerves. The examination considers both your symptoms and the tasks you repeat.",
    "symptoms": [
      "Neck or shoulder discomfort",
      "Elbow or forearm pain",
      "Wrist or hand symptoms",
      "Low back pain"
    ],
    "care": "Dr. DeFries evaluates the affected areas and how you perform relevant movements. Care may include soft tissue therapies, appropriate joint treatment, targeted exercise, and changes in positioning or workload. The goal is to build capacity while identifying manageable adjustments to your routine.",
    "home": "Care at your location can make task-specific guidance practical. Where feasible, we discuss tool use, movement breaks, and ways to vary physical demands.",
    "safety": "Progressive weakness, persistent numbness, a hot swollen joint, or severe symptoms after injury requires medical evaluation.",
    "related": [
      "neck-pain",
      "shoulder-pain",
      "elbow-pain",
      "wrist-hand-pain"
    ],
    "mobilityLabel": "Move and work more comfortably",
    "activity": "Work toward tolerating daily tasks while building capacity and varying physical demands.",
    "mobilityIcon": "reach",
    "heroTitle": "Repetitive Strain & Work-Related Discomfort",
    "description": "Repetitive Strain & Work-Related Discomfort evaluation and mobile chiropractic care in Delaware County and surrounding service areas. Learn about symptoms, care options, and when to seek help."
  }
];

export function getCondition(slug: string) {
  return CONDITIONS.find((condition) => condition.slug === slug);
}
