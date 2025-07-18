'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoFormData } from '@/lib/validations';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatPhoneNumber, unformatPhoneNumber } from '@/utils/phoneFormat';

interface PersonalInfoFormProps {
  initialData?: Partial<PersonalInfoFormData>;
  onSubmit: (data: PersonalInfoFormData) => void;
  onNext: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialData,
  onSubmit,
  onNext,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState(initialData?.phone ? formatPhoneNumber(initialData.phone) : '');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const formData = watch();
  const completedFields = Object.values(formData).filter(Boolean).length;
  const totalFields = Object.keys(personalInfoSchema.shape).length;
  const progressPercentage = Math.round((completedFields / totalFields) * 100);

  const handleFormSubmit = async (data: PersonalInfoFormData) => {
    setIsSubmitting(true);
    onSubmit(data);
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ✨ Let&apos;s Start With Your Personal Information
          </h2>
          <p className="text-gray-600 mb-4">
            You&apos;re sharing your professional identity with the world - how exciting! 🌟
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">You&apos;re Building Something Amazing!</span>
              <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              />
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {progressPercentage === 0 && "Ready to start your amazing journey? ✨"}
              {progressPercentage > 0 && progressPercentage < 25 && "Great start! You're building momentum! 🌟"}
              {progressPercentage >= 25 && progressPercentage < 50 && "Fantastic progress! Keep going! 🚀"}
              {progressPercentage >= 50 && progressPercentage < 75 && "You're more than halfway! Looking amazing! 💫"}
              {progressPercentage >= 75 && progressPercentage < 100 && "Almost there! Your resume is taking shape beautifully! ✨"}
              {progressPercentage === 100 && "Incredible! You've created something truly special! 🎉"}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Amazing First Name ✨
              </label>
              <input
                {...register('firstName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your wonderful first name"
              />
              {errors.firstName && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.firstName.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Professional Last Name ✨
              </label>
              <input
                {...register('lastName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your amazing last name"
              />
              {errors.lastName && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.lastName.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Professional Email Address 📧
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.email.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Contact Number 📱
              </label>
              <input
                {...register('phone')}
                type="tel"
                value={phoneDisplay}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  const unformatted = unformatPhoneNumber(formatted);
                  setPhoneDisplay(formatted);
                  setValue('phone', unformatted, { shouldValidate: true });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.phone.message}
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Professional Address 🏠
              </label>
              <input
                {...register('address')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="123 Main Street, Apt 4B"
              />
              {errors.address && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.address.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Beautiful City 🌆
              </label>
              <input
                {...register('city')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your beautiful city"
              />
              {errors.city && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.city.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Home State 🗺️
              </label>
              <input
                {...register('state')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="CA"
              />
              {errors.state && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.state.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Area Code 📍
              </label>
              <input
                {...register('zipCode')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="12345"
              />
              {errors.zipCode && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.zipCode.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Professional LinkedIn 🔗 <span className="text-gray-500">(showcase your network!)</span>
              </label>
              <input
                {...register('linkedIn')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {errors.linkedIn && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.linkedIn.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Amazing Website 🌐 <span className="text-gray-500">(show your work!)</span>
              </label>
              <input
                {...register('website')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.website.message}
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Inspiring Professional Story ⭐
                </label>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`font-medium ${
                    (formData.summary?.length || 0) > 500 
                      ? 'text-red-500' 
                      : (formData.summary?.length || 0) > 450 
                        ? 'text-amber-500' 
                        : 'text-gray-500'
                  }`}>
                    {formData.summary?.length || 0}/500
                  </span>
                  {(formData.summary?.length || 0) > 500 && (
                    <span className="text-red-500 text-xs">📝 Over limit</span>
                  )}
                  {(formData.summary?.length || 0) > 450 && (formData.summary?.length || 0) <= 500 && (
                    <span className="text-amber-500 text-xs">⚡ Almost there</span>
                  )}
                </div>
              </div>
              <textarea
                {...register('summary')}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  (formData.summary?.length || 0) > 500
                    ? 'border-red-300 focus:ring-red-500'
                    : (formData.summary?.length || 0) > 450
                      ? 'border-amber-300 focus:ring-amber-500'
                      : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Tell us about your amazing journey and what makes you unique. This is where you shine!"
              />
              {errors.summary && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 flex items-center">
                    <span className="mr-2">💙</span>
                    {errors.summary.message}
                  </p>
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Share your story - your experience, passion, and what drives you professionally.
                {(formData.summary?.length || 0) > 450 && (formData.summary?.length || 0) <= 500 && (
                  <span className="text-amber-600 ml-1">Almost at the sweet spot! ✨</span>
                )}
                {(formData.summary?.length || 0) > 500 && (
                  <span className="text-red-600 ml-1">Let&apos;s keep it focused and impactful! 🎯</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                isValid
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Saving your amazing info...' : 'Complete Personal Info ✨'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};