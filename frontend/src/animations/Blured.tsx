'use client';

import {motion, useInView} from 'framer-motion';
import * as React from 'react';

export default function Blured({ text = 'Blured Animation', className }: { text: string , className?: string}) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return(
        <motion.p

            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{  duration: 1.3 }}
            className={className? className : "text-2xl font-mono"}
            >
        {text}
        </motion.p>
    )
}