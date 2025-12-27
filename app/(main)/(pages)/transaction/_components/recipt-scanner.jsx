"use client";
import { scanReceipt } from '@/actions/transaction';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { Camera, Loader2, Sparkles } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner';

const ReciptScanner = ({ onScanComplete }) => {
    const fileInputRef = useRef();
    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReceipt)

    const handleReceiptScan = async (file) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }
        await scanReceiptFn(file);
    };

    useEffect(() => {
        if (scannedData && !scanReceiptLoading) {
            onScanComplete(scannedData);
            toast.success("Receipt scanned successfully");
        }
    }, [scanReceiptLoading, scannedData]);

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                className='hidden'
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReceiptScan(file);
                }}
            />
            <Button
                type="button"
                variant="outline"
                className="w-full h-10 bg-gradient-to-br from-slate-800 to-slate-700 animate-gradient hover:opacity-90 transition-all text-white hover:text-white shadow-lg shadow-slate-500/20 hover:scale-[1.02] active:scale-95"
                onClick={() => fileInputRef.current?.click()}
                disabled={scanReceiptLoading}
            >
                {scanReceiptLoading ? (
                    <>
                        <Loader2 className='mr-2 animate-spin' />
                        <span>Scanning Receipt...</span>
                    </>
                ) : (
                    <>
                        <Camera className='mr-2' />
                        <span className="font-semibold">
                            Scan Receipt with AI
                            <Sparkles className="h-3 w-3 inline ml-1 fill-yellow-300 text-yellow-300" />
                        </span>
                    </>
                )}
            </Button>
        </div>
    )
}

export default ReciptScanner
