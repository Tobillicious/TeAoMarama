import {
  Award,
  CheckCircle,
  Copy,
  Crown,
  DollarSign,
  Gift,
  Share2,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface ReferralData {
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  referralCode: string;
}

const ReferralSystem: React.FC = () => {
  const [referralData] = useState<ReferralData>({
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarnings: 400,
    pendingEarnings: 200,
    referralCode: 'TEKETE2025',
  });

  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(
      `https://teketeakoclient.com/signup?ref=${referralData.referralCode}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [recentReferrals] = useState([
    { id: 1, name: 'Sarah Mitchell', status: 'Active', earnings: 50, date: '2025-09-15' },
    { id: 2, name: 'James Wilson', status: 'Trial', earnings: 0, date: '2025-09-14' },
    { id: 3, name: 'Emma Thompson', status: 'Active', earnings: 50, date: '2025-09-13' },
    { id: 4, name: 'Michael Chen', status: 'Active', earnings: 50, date: '2025-09-12' },
    { id: 5, name: 'Lisa Brown', status: 'Trial', earnings: 0, date: '2025-09-11' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-12 w-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">Referral System</h1>
          </div>
          <p className="text-xl text-blue-200">Earn $50 for every teacher you refer!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Referrals</p>
                <p className="text-3xl font-bold text-white">{referralData.totalReferrals}</p>
              </div>
              <Users className="h-12 w-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Successful</p>
                <p className="text-3xl font-bold text-white">{referralData.successfulReferrals}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-white">${referralData.totalEarnings}</p>
              </div>
              <DollarSign className="h-12 w-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-white">${referralData.pendingEarnings}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Share2 className="h-6 w-6 mr-2 text-blue-400" />
              Your Referral Link
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-blue-200 text-sm mb-2">Referral Code:</p>
                <p className="text-2xl font-bold text-white">{referralData.referralCode}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-blue-200 text-sm mb-2">Full Link:</p>
                <p className="text-white break-all">
                  https://teketeakoclient.com/signup?ref={referralData.referralCode}
                </p>
              </div>
              <button
                onClick={copyReferralCode}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 mr-2" />
                    Copy Referral Link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-400" />
              How It Works
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="text-white font-semibold">Share Your Link</p>
                  <p className="text-blue-200 text-sm">
                    Send your referral link to fellow teachers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="text-white font-semibold">They Sign Up</p>
                  <p className="text-blue-200 text-sm">
                    Your referral creates an account using your link
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="text-white font-semibold">They Subscribe</p>
                  <p className="text-blue-200 text-sm">When they upgrade to a paid plan</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  $
                </div>
                <div>
                  <p className="text-white font-semibold">You Earn $50</p>
                  <p className="text-blue-200 text-sm">Credited to your account within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2 text-green-400" />
            Recent Referrals
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-blue-200 py-3">Name</th>
                  <th className="text-left text-blue-200 py-3">Status</th>
                  <th className="text-left text-blue-200 py-3">Earnings</th>
                  <th className="text-left text-blue-200 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-white/10">
                    <td className="py-3 text-white">{referral.name}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          referral.status === 'Active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-3 text-green-400 font-semibold">${referral.earnings}</td>
                    <td className="py-3 text-blue-200">{referral.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Referral Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Star className="h-8 w-8 text-yellow-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Share on Social Media</h4>
            <p className="text-blue-200 text-sm">
              Post about TeKeteAkoClient on Facebook, LinkedIn, or Twitter to reach more teachers
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Users className="h-8 w-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Email Colleagues</h4>
            <p className="text-blue-200 text-sm">
              Send personalized emails to teachers you know who would benefit from our platform
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Crown className="h-8 w-8 text-purple-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Staff Meetings</h4>
            <p className="text-blue-200 text-sm">
              Mention TeKeteAkoClient during staff meetings or professional development sessions
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h3>
            <p className="text-blue-200 mb-6">
              Every teacher you refer helps build our community and puts money in your pocket
            </p>
            <button
              onClick={copyReferralCode}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto"
            >
              <Share2 className="h-6 w-6 mr-2" />
              Share Your Referral Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;
