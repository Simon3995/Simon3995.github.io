function byte_format(bits) {
    let bytes = bits/8;
    if (bits < 1000) return `${bits} b`;
    let order = Math.min(10, Math.floor(logab(1000, bytes)));
    let prefix = "KMGTPEZYRQ"[order-1];
    if (!prefix) prefix = "";
    return `${(bytes / (1e3 ** order)).toFixed(order>0?2:0)} ${prefix}B`;
}

function logab(a, b) {
    return Math.log(b) / Math.log(a);
}

function format_duration(seconds) {
    const units = [
        { label: 'Y', seconds: 365 * 24 * 60 * 60 },
        { label: 'M', seconds: 30 * 24 * 60 * 60 },
        { label: 'D', seconds: 24 * 60 * 60 },
        { label: 'h', seconds: 60 * 60 },
        { label: 'm', seconds: 60 },
        { label: 's', seconds: 1 },
    ];

    const parts = [];

    for (const unit of units) {
        const value = Math.floor(seconds / unit.seconds);
        if (value > 0 && parts.length < 2) {
            parts.push(`${value}${unit.label}`);
            seconds -= value * unit.seconds;
        }
    }

    return parts.length > 0 ? parts.join(' ') : '0 s';
}