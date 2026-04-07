import React from 'react';

interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
  rotation?: string;
}

const BentoItem = ({ className, children, rotation }: BentoItemProps) => {
    const style = {
        '--rotation': rotation || '0deg',
    } as React.CSSProperties;
    return (
        <div className={`bento-item ${className}`} style={style}>
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default BentoItem;
