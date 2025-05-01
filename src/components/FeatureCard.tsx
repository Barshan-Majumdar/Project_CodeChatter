
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 hover:border-codechatter-purple/50 transition-all group h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4 bg-gradient-to-br from-codechatter-blue to-codechatter-purple p-3 rounded-lg inline-flex w-12 h-12 items-center justify-center group-hover:from-codechatter-purple group-hover:to-codechatter-blue transition-all">
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;
