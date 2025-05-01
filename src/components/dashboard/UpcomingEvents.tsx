
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface Event {
  name: string;
  date: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <Card className="bg-codechatter-dark border-codechatter-blue/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center">
          <Calendar size={18} className="mr-2 text-codechatter-purple" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="p-3 rounded-lg bg-codechatter-darker border border-codechatter-blue/10 hover:border-codechatter-purple/30 transition-colors"
          >
            <h4 className="font-medium text-white text-sm">{event.name}</h4>
            <p className="text-white/60 text-xs mt-1 flex items-center">
              <Calendar size={12} className="mr-1" /> {event.date}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full border-codechatter-purple/20 text-codechatter-purple hover:bg-codechatter-purple/10"
        >
          View Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;
