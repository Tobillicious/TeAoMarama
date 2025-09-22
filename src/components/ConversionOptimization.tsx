// Conversion Optimization Components for Te Ao Mārama

// High-Converting CTA Buttons
export const HighConvertingCTA = ({ variant = 'control', children, ...props }) => {
  const variants = {
    control: 'bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold',
    urgency: 'bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold animate-pulse',
    value: 'bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold',
    social: 'bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold'
  };
  
  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
};

// Social Proof Component
export const SocialProof = () => (
  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
    <div className="flex items-center justify-center space-x-4 mb-4">
      <Star className="h-6 w-6 text-yellow-500 fill-current" />
      <Star className="h-6 w-6 text-yellow-500 fill-current" />
      <Star className="h-6 w-6 text-yellow-500 fill-current" />
      <Star className="h-6 w-6 text-yellow-500 fill-current" />
      <Star className="h-6 w-6 text-yellow-500 fill-current" />
    </div>
    <p className="text-gray-700 font-medium text-center">
      "TeKeteAkoClient has transformed my teaching. The resources are incredible and the analytics help me understand my students better than ever."
    </p>
    <p className="text-sm text-gray-600 mt-2 text-center">- Sarah M., Year 8 Teacher, Auckland</p>
  </div>
);

// Urgency Component
export const UrgencyIndicator = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <Clock className="h-5 w-5 text-red-500 mr-2" />
      <span className="text-red-700 font-semibold">
        Limited Time: Join 2,500+ teachers before the end of the term!
      </span>
    </div>
  </div>
);

// Value Proposition Component
export const ValueProposition = () => (
  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">
      Why Teachers Choose Te Ao Mārama
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">6,055+</div>
        <div className="text-gray-700">Premium Lessons</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-2">9/10</div>
        <div className="text-gray-700">Cultural Safety Score</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-600 mb-2">2,500+</div>
        <div className="text-gray-700">Active Teachers</div>
      </div>
    </div>
  </div>
);

// Trust Signals Component
export const TrustSignals = () => (
  <div className="flex items-center justify-center space-x-8 py-6">
    <div className="text-center">
      <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
      <div className="text-sm text-gray-600">Secure & Private</div>
    </div>
    <div className="text-center">
      <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
      <div className="text-sm text-gray-600">14-day Free Trial</div>
    </div>
    <div className="text-center">
      <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
      <div className="text-sm text-gray-600">No Credit Card</div>
    </div>
    <div className="text-center">
      <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
      <div className="text-sm text-gray-600">NZ Teachers</div>
    </div>
  </div>
);