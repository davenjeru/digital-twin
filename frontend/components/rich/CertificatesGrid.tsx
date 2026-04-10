'use client';

import { useState } from 'react';
import { Award, GraduationCap, ZoomIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog';
import { certificates, type CertificateEntry } from './data/certificates';

export default function CertificatesGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certificates.map((cert) => (
                <CertificateCard key={cert.name} cert={cert} />
            ))}
        </div>
    );
}

function CertificateCard({ cert }: { cert: CertificateEntry }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col hover:border-primary/40 transition-colors">
            {/* Image area */}
            <div className="relative bg-muted aspect-video flex items-center justify-center overflow-hidden">
                {!imgError ? (
                    <Dialog>
                        <DialogTrigger className="w-full h-full group relative block">
                            <img
                                src={`/certificates/${cert.image}`}
                                alt={`${cert.name} certificate`}
                                className="w-full h-full object-cover"
                                onError={() => setImgError(true)}
                            />
                            {/* Zoom hint on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                            </div>
                        </DialogTrigger>
                        <DialogContent
                            className="max-w-3xl w-full p-2 gap-0"
                            showCloseButton
                        >
                            <DialogHeader className="p-3 pb-2">
                                <DialogTitle className="text-sm">{cert.name}</DialogTitle>
                                <DialogDescription className="text-xs">
                                    {cert.issuer} · {cert.issued}
                                </DialogDescription>
                            </DialogHeader>
                            <img
                                src={`/certificates/${cert.image}`}
                                alt={`${cert.name} certificate`}
                                className="w-full rounded-lg object-contain max-h-[75vh]"
                            />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <FallbackIcon cert={cert} />
                )}
            </div>

            {/* Text area */}
            <div className="p-3 flex flex-col gap-1.5">
                <p className="text-xs font-medium text-muted-foreground leading-none">
                    {cert.issuer}
                </p>
                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                    {cert.name}
                </p>
                <div className="flex items-center justify-between mt-auto pt-1">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                        {cert.issued}
                    </Badge>
                    {cert.type === 'course' && cert.platform && (
                        <span className="text-[10px] text-muted-foreground">{cert.platform}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

function FallbackIcon({ cert }: { cert: CertificateEntry }) {
    const Icon = cert.type === 'course' ? GraduationCap : Award;
    return (
        <div className="flex flex-col items-center gap-2 p-4 text-center">
            <Icon className="h-8 w-8 text-muted-foreground/40" />
            <span className="text-xs text-muted-foreground/60 leading-tight max-w-[120px]">
                {cert.issuer}
            </span>
        </div>
    );
}
