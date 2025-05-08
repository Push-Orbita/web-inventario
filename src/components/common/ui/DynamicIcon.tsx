import React, { Suspense } from 'react';
import * as Icons from 'react-icons/io5';
import { IconType } from 'react-icons';
import { Skeleton } from 'primereact/skeleton';

export type IconName = keyof typeof Icons;

interface DynamicIconProps {
    iconName: IconName;
    size?: string;
    w?: string;
    h?: string;
    xs?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size = '24', w, h, xs }: DynamicIconProps) => {
    const IconComponent = React.lazy(() => {
        return import(`react-icons/io5`).then((module) => {
            const Icon: IconType = module[iconName];
            if (!Icon) {
                throw new Error('icon not found');
            }
            return { default: () => <Icon size={size} className={`text-primary-600 dark:text-primary-400 ${w} ${h} ${xs}`} /> };
        }).catch(() => {
            return { default: () => <span></span> };
        });
    });

    return (
        <Suspense fallback={<Skeleton size="3rem" className="mr-2"></Skeleton>}>
            <IconComponent />
        </Suspense>
    );
};

export default DynamicIcon;