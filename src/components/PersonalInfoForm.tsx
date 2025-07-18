'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoFormData } from '@/lib/validations';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
              <span className="text-sm font-medium text-gray-700">Section Progress</span>
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
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name ✨
              </label>
              <input
                {...register('firstName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your wonderful first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name ✨
              </label>
              <input
                {...register('lastName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your amazing last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address 📧
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number 📱
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address 🏠
              </label>
              <input
                {...register('address')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="123 Main Street, Apt 4B"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City 🌆
              </label>
              <input
                {...register('city')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your beautiful city"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State 🗺️
              </label>
              <input
                {...register('state')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="CA"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code 📍
              </label>
              <input
                {...register('zipCode')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="12345"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile 🔗 <span className="text-gray-500">(optional)</span>
              </label>
              <input
                {...register('linkedIn')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://linkedin.com/in/yourprofile"
              />
              {errors.linkedIn && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.linkedIn.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Website 🌐 <span className="text-gray-500">(optional)</span>
              </label>
              <input
                {...register('website')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.website.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary ⭐
              </label>
              <textarea
                {...register('summary')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Tell us about your amazing journey and what makes you unique. This is where you shine!"
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-amber-600 flex items-center">
                  <span className="mr-1">💡</span>
                  {errors.summary.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Share your story - your experience, passion, and what drives you professionally.
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