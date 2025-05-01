
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    user: { name: 'Sarah Kim' },
    action: 'solved',
    target: 'Binary Tree Traversal',
    time: '5 min ago',
  },
  {
    id: 2,
    user: { name: 'Alex Wong' },
    action: 'posted',
    target: 'a new challenge: "Optimize This"',
    time: '10 min ago',
  },
  {
    id: 3,
    user: { name: 'Mia Johnson' },
    action: 'earned',
    target: 'the "Code Warrior" badge',
    time: '30 min ago',
  },
  {
    id: 4,
    user: { name: 'David Chen' },
    action: 'commented on',
    target: 'your solution to "Recursive Maze"',
    time: '1 hour ago',
  },
  {
    id: 5,
    user: { name: 'Emma Davis' },
    action: 'shared',
    target: 'an article: "ML for Coders"',
    time: '2 hours ago',
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20 h-full">
      <CardHeader>
        <CardTitle className="text-white text-lg">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <div className="bg-gradient-to-br from-codechatter-blue to-codechatter-purple w-full h-full flex items-center justify-center text-white text-xs font-medium">
                  {activity.user.name.charAt(0)}
                </div>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-5">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  <span className="text-white/70">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-white/50 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
