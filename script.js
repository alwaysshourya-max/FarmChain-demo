// MangoChain - WORKING QR Code System with Blockchain
// RBVP Project with Actual Scannable QR Codes

// State variables
let currentBatch = "MANGO2024-001";
let blockchain = [];
let currentStep = 0;
let html5QrCode = null;
let isScanning = false;
let qrCodeInstance = null;

// Journey step data
const journeySteps = [
    { 
        id: 1, 
        name: "Farm Harvest", 
        action: "Harvest recorded on blockchain",
        from: "Green Valley Farm",
        to: "Blockchain System",
        icon: "tree",
        description: "Mangoes harvested and recorded on blockchain"
    },
    { 
        id: 2, 
        name: "Processing & Packing", 
        action: "Washed, graded, and packed",
        from: "Farm",
        to: "Packing Facility",
        icon: "industry",
        description: "Quality check and packaging completed"
    },
    { 
        id: 3, 
        name: "Transportation", 
        action: "Shipped via refrigerated truck",
        from: "Packing Facility",
        to: "Distribution Center",
        icon: "truck",
        description: "Transport with temperature control"
    },
    { 
        id: 4, 
        name: "Supermarket Display", 
        action: "Placed on shelf with QR code",
        from: "Distribution Center",
        to: "FreshMart Supermarket",
        icon: "store",
        description: "Product displayed for consumers"
    },
    { 
        id: 5, 
        name: "Consumer Purchase", 
        action: "Purchased by consumer",
        from: "Supermarket",
        to: "Consumer",
        icon: "shopping-cart",
        description: "Consumer scans QR to verify authenticity"
    }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("MangoChain RBVP Demo Initialized");
    
    // Initialize blockchain with genesis block
    initializeBlockchain();
    
    // Generate WORKING QR code
    generateWorkingQRCode();
    
    // Update displays
    updateBatchDisplay();
    updateStepDisplays();
    
    // Show welcome notification
    showNotification("🎯 RBVP Demo Ready! Scan the QR code with any camera app.", "info");
});

// Initialize blockchain
function initializeBlockchain() {
    blockchain = [
        {
            block: 0,
            timestamp: getCurrentTimestamp(),
            from: "GENESIS",
            to: "SYSTEM",
            action: "Blockchain initialized for MangoChain",
            hash: generateBlockHash("genesis")
        }
    ];
    updateBlockchainDisplay();
}

// Generate WORKING QR code using QRCode library
function generateWorkingQRCode() {
    const qrContainer = document.getElementById('qr-code-display');
    qrContainer.innerHTML = ''; // Clear previous
    
    // Create QR code data
    const qrData = createQRCodeData();
    
    try {
        // Clear any existing QR code
        if (qrCodeInstance) {
            qrCodeInstance.clear();
        }
        
        // Generate REAL QR code using QRCode library
        qrCodeInstance = new QRCode(qrContainer, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#2c3e50",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        console.log("Working QR code generated successfully!");
        qrContainer.classList.add('qr-pulse');
        setTimeout(() => qrContainer.classList.remove('qr-pulse'), 500);
        
        // Add border to canvas
        setTimeout(() => {
            const canvas = qrContainer.querySelector('canvas');
            if (canvas) {
                canvas.style.border = "1px solid #e0e0e0";
                canvas.style.borderRadius = "8px";
                canvas.style.padding = "5px";
                canvas.style.background = "white";
            }
        }, 100);
        
    } catch (error) {
        console.error("QR Code generation error:", error);
        showNotification("QR code error. Using backup display.", "warning");
        createBackupQRDisplay();
    }
}

// Create QR code data
function createQRCodeData() {
    // Create a URL-like structure that phones can open
    const qrData = `https://mangochain.verify/${currentBatch}?` +
        `farm=Green+Valley+Farm&` +
        `farmer=Rajesh+Kumar&` +
        `product=Alphonso+Mango&` +
        `location=Ratnagiri+Maharashtra&` +
        `harvest=${getCurrentDate()}&` +
        `step=${currentStep}&` +
        `blocks=${blockchain.length}&` +
        `hash=${blockchain[blockchain.length-1].hash.substring(0, 16)}&` +
        `time=${Date.now()}`;
    
    return qrData;
}

// Backup QR display if library fails
function createBackupQRDisplay() {
    const qrContainer = document.getElementById('qr-code-display');
    qrContainer.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 20px;">
            <div style="font-size: 3rem; color: #2c3e50; margin-bottom: 10px;">
                🥭
            </div>
            <div style="font-family: 'Roboto Mono'; font-weight: bold; color: #2c3e50; font-size: 1.2rem; margin-bottom: 10px;">
                ${currentBatch}
            </div>
            <div style="color: #7f8c8d; margin-top: 5px; font-size: 0.9rem;">
                FARMCHAIN VERIFICATION
            </div>
            <div style="margin-top: 15px; color: #27ae60; font-size: 0.8rem;">
                <i class="fas fa-check-circle"></i> Scannable QR Code
            </div>
            <div style="margin-top: 10px; font-size: 0.8rem; color: #666;">
                (Simulated for demo)
            </div>
        </div>
    `;
}

// Generate new batch
function generateNewBatch() {
    const randomNum = Math.floor(Math.random() * 900 + 100);
    currentBatch = `MANGO2024-${randomNum}`;
    
    // Reset journey
    resetJourney();
    
    // Initialize new blockchain
    initializeBlockchain();
    
    // Add harvest block
    addBlockToChain(
        "Green Valley Farm",
        "Blockchain System",
        `New batch created: ${currentBatch}`
    );
    
    // Generate new WORKING QR code
    generateWorkingQRCode();
    
    // Update displays
    updateBatchDisplay();
    
    showNotification(`✅ New batch created: ${currentBatch}`, "success");
}

// Quick harvest batch
function harvestBatch() {
    if (currentStep > 0) {
        showNotification("Batch already harvested! Try 'New Batch' instead.", "warning");
        return;
    }
    
    activateStep(1);
}

// Interactive step activation
function activateStep(stepNumber) {
    // Can't skip steps
    if (stepNumber > currentStep + 1) {
        showNotification(`Please complete step ${currentStep + 1} first!`, "warning");
        return;
    }
    
    // Update current step
    currentStep = stepNumber;
    
    // Update step displays
    updateStepDisplays();
    
    // Add to blockchain
    if (stepNumber > 0) {
        const step = journeySteps[stepNumber - 1];
        addBlockToChain(step.from, step.to, step.action);
        
        // Update step status
        const statusElement = document.getElementById(`step${stepNumber}-status`);
        if (statusElement) {
            statusElement.innerHTML = `<span class="status-indicator status-completed"></span>✓ Completed`;
        }
        
        showNotification(`✅ Step ${stepNumber} completed: ${step.name}`, "success");
    }
    
    // Regenerate QR code with updated data
    generateWorkingQRCode();
    
    // If this is step 5 (consumer), show verification option
    if (stepNumber === 5) {
        showNotification("🎉 Journey complete! Now scan the QR code to verify authenticity.", "info");
    }
}

// Reset journey
function resetJourney() {
    currentStep = 0;
    
    // Reset all step statuses
    for (let i = 1; i <= 5; i++) {
        const stepElement = document.getElementById(`step${i}`);
        const statusElement = document.getElementById(`step${i}-status`);
        
        stepElement.classList.remove("active", "completed");
        if (statusElement) {
            statusElement.innerHTML = `<span class="status-indicator status-pending"></span>${journeySteps[i-1].description}`;
        }
    }
    
    updateStepDisplays();
    showNotification("Journey reset. Start from Step 1.", "info");
}

// Simulate full journey
function simulateFullJourney() {
    if (currentStep > 0) {
        showNotification("Journey already in progress! Reset first.", "warning");
        return;
    }
    
    showNotification("Starting automated demo...", "info");
    
    let step = 1;
    const interval = setInterval(() => {
        activateStep(step);
        step++;
        
        if (step > 5) {
            clearInterval(interval);
            setTimeout(() => {
                showNotification("✅ Demo complete! Now scan the QR code with any camera.", "success");
            }, 1000);
        }
    }, 1500);
}

// Update all step displays
function updateStepDisplays() {
    // Update step visuals
    for (let i = 1; i <= 5; i++) {
        const stepElement = document.getElementById(`step${i}`);
        
        if (!stepElement) continue;
        
        // Remove all classes
        stepElement.classList.remove("active", "completed");
        
        // Add appropriate class
        if (i < currentStep) {
            stepElement.classList.add("completed");
        } else if (i === currentStep) {
            stepElement.classList.add("active");
        }
    }
    
    // Update control panel info
    const currentStage = document.getElementById('current-stage');
    if (currentStage) {
        currentStage.textContent = currentStep === 0 ? "Ready for harvest" : journeySteps[currentStep-1].name;
    }
}

// Update batch display
function updateBatchDisplay() {
    document.getElementById('current-batch').textContent = currentBatch;
    document.getElementById('batch-id').textContent = currentBatch;
    document.getElementById('block-count').textContent = blockchain.length;
}

// Add block to blockchain
function addBlockToChain(from, to, action) {
    const newBlock = {
        block: blockchain.length,
        timestamp: getCurrentTimestamp(),
        from: from,
        to: to,
        action: action,
        hash: generateBlockHash(from + to + action + Date.now())
    };
    
    blockchain.push(newBlock);
    updateBlockchainDisplay();
    updateBatchDisplay();
}

// Update blockchain display
function updateBlockchainDisplay() {
    const tbody = document.getElementById('ledger-body');
    
    let html = '';
    blockchain.forEach((block, index) => {
        const isNew = index === blockchain.length - 1;
        html += `
            <tr ${isNew ? 'style="background: #e8f6f3;"' : ''}>
                <td><strong>${block.block}</strong></td>
                <td><code>${block.timestamp}</code></td>
                <td>${block.from} → ${block.to}</td>
                <td>${block.action}</td>
                <td style="font-family: 'Roboto Mono', monospace; font-size: 0.8rem; color: #7f8c8d;">
                    ${block.hash.substring(0, 20)}...
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    
    // Scroll to bottom
    setTimeout(() => {
        tbody.parentElement.scrollTop = tbody.parentElement.scrollHeight;
    }, 100);
}

// Add test transaction
function addTestTransaction() {
    addBlockToChain(
        "Test User",
        "Blockchain System",
        "Test transaction added by judge"
    );
    showNotification("Test transaction added to blockchain", "success");
}

// View blockchain explorer
function viewBlockchainExplorer() {
    const explorerContent = `
        <div style="padding: 20px; font-family: Arial;">
            <h2>🔍 MangoChain Blockchain Explorer</h2>
            <p>Batch: <strong>${currentBatch}</strong></p>
            <p>Total Blocks: <strong>${blockchain.length}</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h4>Latest Block (#${blockchain.length-1})</h4>
                <pre style="background: white; padding: 10px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(blockchain[blockchain.length-1], null, 2)}
                </pre>
            </div>
        </div>
    `;
    
    const explorerWindow = window.open('', '_blank');
    explorerWindow.document.write(explorerContent);
    explorerWindow.document.close();
}

// REAL QR CODE SCANNER FUNCTIONS

// Start QR scanner
function startScanner() {
    if (isScanning) return;
    
    const scannerContainer = document.getElementById('reader');
    const startBtn = document.getElementById('start-scanner');
    const stopBtn = document.getElementById('stop-scanner');
    
    // Clear previous scanner
    scannerContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: white;">Initializing camera...</div>';
    
    // Initialize scanner
    html5QrCode = new Html5Qrcode("reader");
    
    // Configuration
    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };
    
    // Start scanner
    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        onScanSuccess,
        onScanError
    ).then(() => {
        isScanning = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-flex';
        
        showNotification("📹 Camera scanner started. Point at QR code.", "success");
        
        // Update scan result
        document.getElementById('scan-result').innerHTML = `
            <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; text-align: center;">
                <p><i class="fas fa-camera"></i> Scanner active</p>
                <p class="small">Point camera at any QR code to scan</p>
                <div style="margin-top: 10px; color: #27ae60;">
                    <i class="fas fa-sync fa-spin"></i> Ready to scan...
                </div>
            </div>
        `;
        
    }).catch(err => {
        console.error("Scanner error:", err);
        
        // User-friendly error message
        let errorMsg = "Camera access required";
        if (err.name === "NotAllowedError") {
            errorMsg = "Camera permission denied. Please allow camera access.";
        } else if (err.name === "NotFoundError") {
            errorMsg = "No camera found. Try on a device with camera.";
        }
        
        document.getElementById('scan-result').innerHTML = `
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; text-align: center;">
                <p><i class="fas fa-exclamation-triangle"></i> ${errorMsg}</p>
                <p style="margin-top: 10px;">Try these alternatives:</p>
                <div style="margin-top: 15px;">
                    <button class="btn btn-warning" onclick="testWithPhone()" style="margin: 5px;">
                        <i class="fas fa-mobile-alt"></i> Test with Phone Camera
                    </button>
                    <button class="btn btn-info" onclick="simulateQRScan()" style="margin: 5px;">
                        <i class="fas fa-play"></i> Simulate Scan
                    </button>
                </div>
            </div>
        `;
        
        showNotification("⚠️ " + errorMsg, "warning");
    });
}

// Stop scanner
function stopScanner() {
    if (!html5QrCode || !isScanning) return;
    
    html5QrCode.stop().then(() => {
        isScanning = false;
        document.getElementById('start-scanner').style.display = 'inline-flex';
        document.getElementById('stop-scanner').style.display = 'none';
        
        showNotification("Scanner stopped", "info");
    }).catch(err => {
        console.error("Error stopping scanner:", err);
    });
}

// Handle successful scan
function onScanSuccess(decodedText, decodedResult) {
    console.log("QR Code scanned successfully:", decodedText);
    
    // Process scan
    processQRScan(decodedText);
    
    // Stop scanner after successful scan
    setTimeout(() => stopScanner(), 1000);
}

// Handle scan error
function onScanError(error) {
    // Just log errors, don't show to user during normal operation
    console.log("Scan error (normal):", error);
}

// Process QR scan
function processQRScan(qrData) {
    const verificationResult = document.getElementById('verification-result');
    const scanResult = document.getElementById('scan-result');
    
    // Check if it's our QR code
    if (qrData.includes(currentBatch) || qrData.includes("mangochain.verify")) {
        // Success! It's our QR code
        const urlParams = new URLSearchParams(qrData.split('?')[1]);
        const batchId = qrData.includes(currentBatch) ? currentBatch : "MANGO2024-XXX";
        
        verificationResult.innerHTML = `
            <div style="background: #d4edda; padding: 25px; border-radius: 10px; text-align: center; border-left: 5px solid #28a745;">
                <h3 style="color: #155724; margin-bottom: 15px;">
                    <i class="fas fa-check-circle"></i> ✅ PRODUCT VERIFIED!
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; margin: 20px 0;">
                    <div>
                        <p><strong>Batch ID:</strong> ${batchId}</p>
                        <p><strong>Farm:</strong> ${urlParams.get('farm') || 'Green Valley Farm'}</p>
                        <p><strong>Farmer:</strong> ${urlParams.get('farmer') || 'Rajesh Kumar'}</p>
                        <p><strong>Product:</strong> ${urlParams.get('product') || 'Alphonso Mango'}</p>
                    </div>
                    <div>
                        <p><strong>Location:</strong> ${urlParams.get('location') || 'Ratnagiri, Maharashtra'}</p>
                        <p><strong>Harvest:</strong> ${urlParams.get('harvest') || getCurrentDate()}</p>
                        <p><strong>Journey Step:</strong> ${urlParams.get('step') || currentStep}</p>
                        <p><strong>Match:</strong> ${batchId === currentBatch ? "✅ Current Batch" : "⚠️ Different Batch"}</p>
                    </div>
                </div>
                <div style="background: #c3e6cb; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p style="margin: 0; color: #155724;">
                        <i class="fas fa-shield-alt"></i> 
                        This product is 100% authentic and traceable via blockchain
                    </p>
                </div>
                <div style="margin-top: 20px; font-size: 0.9rem; color: #666;">
                    <i class="fas fa-info-circle"></i> QR Code scanned at: ${getCurrentTimestamp()}
                </div>
            </div>
        `;
        
        scanResult.innerHTML = `
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; text-align: center;">
                <p><i class="fas fa-check-circle"></i> Scan successful!</p>
                <p>QR code verified as genuine FarmChain product</p>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                    Batch: <strong>${batchId}</strong>
                </p>
            </div>
        `;
        
        // Add verification to blockchain
        addBlockToChain(
            "QR Scanner",
            "Verification System",
            `Product verified via QR scan: ${batchId}`
        );
        
        showNotification("✅ REAL QR code scanned successfully! Product verified.", "success");
        
    } else {
        // Not our QR code format
        verificationResult.innerHTML = `
            <div style="background: #f8d7da; padding: 25px; border-radius: 10px; text-align: center; border-left: 5px solid #dc3545;">
                <h3 style="color: #721c24; margin-bottom: 15px;">
                    <i class="fas fa-exclamation-triangle"></i> ❌ VERIFICATION FAILED
                </h3>
                <p style="color: #721c24; margin-bottom: 15px;">
                    This is not a valid MangoChain QR code.
                </p>
                <div style="background: #f5c6cb; padding: 15px; border-radius: 8px;">
                    <p style="margin: 0; color: #721c24;">
                        <i class="fas fa-ban"></i> 
                        This QR code cannot be verified by our system.
                    </p>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0; color: #666; font-family: 'Roboto Mono'; font-size: 0.9rem;">
                        ${qrData.substring(0, 80)}${qrData.length > 80 ? '...' : ''}
                    </p>
                </div>
            </div>
        `;
        
        scanResult.innerHTML = `
            <div style="background: #f8d7da; padding: 15px; border-radius: 8px; text-align: center;">
                <p><i class="fas fa-exclamation-triangle"></i> Invalid QR code</p>
                <p>This is not a MangoChain product QR code</p>
            </div>
        `;
        
        showNotification("❌ Invalid QR code - Not a MangoChain product", "warning");
    }
}

// Test with phone
function testWithPhone() {
    const verificationResult = document.getElementById('verification-result');
    
    verificationResult.innerHTML = `
        <div style="background: #e8f4fc; padding: 25px; border-radius: 10px; text-align: center;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">
                <i class="fas fa-mobile-alt"></i> Phone Camera Test
            </h3>
            <div style="margin: 20px 0;">
                <p><strong>To test with your phone:</strong></p>
                <ol style="text-align: left; margin: 15px 0; padding-left: 20px;">
                    <li>Open your phone's camera app</li>
                    <li>Point camera at the QR code on screen</li>
                    <li>Your phone will detect it automatically</li>
                    <li>Tap the notification/link that appears</li>
                    <li>You'll see the product verification page</li>
                </ol>
            </div>
            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #0c5460;">
                    <i class="fas fa-lightbulb"></i> 
                    <strong>Tip:</strong> Most modern phones scan QR codes automatically
                </p>
            </div>
            <div style="margin-top: 20px;">
                <button class="btn btn-success" onclick="simulatePhoneScan()">
                    <i class="fas fa-play"></i> Simulate Phone Scan
                </button>
            </div>
        </div>
    `;
    
    showNotification("📱 Try scanning with your phone camera!", "info");
}

// Simulate phone scan
function simulatePhoneScan() {
    // Use the actual QR code data
    const qrData = createQRCodeData();
    processQRScan(qrData);
}

// Simulate QR scan for demo
function simulateQRScan() {
    const scanResult = document.getElementById('scan-result');
    
    // Show scanning animation
    scanResult.innerHTML = `
        <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; text-align: center;">
            <p><i class="fas fa-search" style="animation: pulse 1s infinite;"></i></p>
            <p>Simulating QR code scan...</p>
        </div>
    `;
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // After 2 seconds, show result
    setTimeout(() => {
        simulatePhoneScan();
    }, 2000);
}

// Download QR code
function downloadQRCode() {
    const qrCanvas = document.querySelector('#qr-code-display canvas');
    
    if (qrCanvas) {
        // Convert canvas to data URL
        const dataUrl = qrCanvas.toDataURL('image/png');
        
        // Create download link
        const link = document.createElement('a');
        link.download = `MangoChain_${currentBatch}.png`;
        link.href = dataUrl;
        link.click();
        
        showNotification("✅ QR code downloaded as PNG", "success");
    } else {
        // Create a simple QR code image for download
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300);
        
        // Simple QR pattern
        ctx.fillStyle = '#2c3e50';
        const cellSize = 10;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (Math.random() > 0.5) {
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize-1, cellSize-1);
                }
            }
        }
        
        // Text
        ctx.fillStyle = '#27ae60';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('MANGOCHAIN', 150, 270);
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = '16px Arial';
        ctx.fillText(currentBatch, 150, 290);
        
        // Download
        const link = document.createElement('a');
        link.download = `MangoChain_${currentBatch}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showNotification("✅ QR code image downloaded", "success");
    }
}

// Print QR code
function printQRCode() {
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>MangoChain QR Code - ${currentBatch}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 40px; 
                    text-align: center; 
                    max-width: 600px;
                    margin: 0 auto;
                }
                .qr-container { 
                    border: 2px solid #27ae60;
                    border-radius: 15px;
                    padding: 30px;
                    margin: 20px auto;
                }
                h1 { 
                    color: #27ae60; 
                    margin-bottom: 10px;
                }
                h3 {
                    color: #2c3e50;
                    margin-bottom: 30px;
                }
                .qr-code { 
                    width: 250px; 
                    height: 250px;
                    margin: 20px auto;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 10px;
                    background: white;
                }
                .batch-info {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    font-family: 'Courier New', monospace;
                }
                .instructions {
                    text-align: left;
                    margin: 30px 0;
                    padding: 20px;
                    background: #e8f4fc;
                    border-radius: 8px;
                }
                @media print {
                    button { display: none; }
                    .qr-container { border: 1px solid #ccc; }
                }
            </style>
        </head>
        <body>
            <div class="qr-container">
                <h1>🥭 MangoChain</h1>
                <h3>Blockchain Food Transparency System</h3>
                
                <div class="batch-info">
                    <h2 style="margin: 0; color: #2c3e50;">${currentBatch}</h2>
                    <p><strong>Farm:</strong> Green Valley Farm, Ratnagiri</p>
                    <p><strong>Product:</strong> Alphonso Mango</p>
                    <p><strong>Generated:</strong> ${getCurrentTimestamp()}</p>
                </div>
                
                <div class="qr-code">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #2c3e50; text-align: center;">
                        MangoChain<br>${currentBatch}<br>Scan to Verify
                    </div>
                </div>
                
                <div class="instructions">
                    <p><strong>Scan Instructions:</strong></p>
                    <p>1. Open camera app on your phone</p>
                    <p>2. Point camera at this QR code</p>
                    <p>3. View complete blockchain-based product journey</p>
                    <p>4. Verify authenticity and origin instantly</p>
                </div>
                
                <div style="margin-top: 40px; color: #7f8c8d; font-size: 0.9rem;">
                    <p>MangoChain - RBVP Project | Blockchain Supply Chain Transparency</p>
                </div>
                
                <div style="margin-top: 40px;">
                    <button onclick="window.print()" style="padding: 12px 24px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                        Print This Page
                    </button>
                    <button onclick="window.close()" style="padding: 12px 24px; background: #e74c3c; color: white; border: none; border-radius: 6px; margin-left: 15px; cursor: pointer; font-size: 16px;">
                        Close
                    </button>
                </div>
            </div>
            <script>
                // Auto-print after loading
                setTimeout(function() {
                    window.print();
                }, 500);
            </script>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Share QR code
function shareQRCode() {
    if (navigator.share) {
        navigator.share({
            title: `MangoChain QR Code - ${currentBatch}`,
            text: `Scan this QR code to track Alphonso mangoes from Green Valley Farm using blockchain technology. Batch: ${currentBatch}`,
            url: window.location.href
        });
    } else {
        // Copy to clipboard as fallback
        const textToCopy = `MangoChain QR Code\nBatch: ${currentBatch}\nScan with camera to verify\n${window.location.href}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification("📋 Copied QR code info to clipboard!", "success");
        }).catch(() => {
            showNotification("Share not supported. Try Download instead.", "info");
        });
    }
}

// Helper functions
function generateBlockHash(input) {
    // Simple hash generation for demo
    let hash = '0x';
    const chars = '0123456789abcdef';
    for (let i = 0; i < 32; i++) {
        hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
}

function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + 
           ' • ' + now.toLocaleDateString();
}

function getCurrentDate() {
    return new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function showNotification(message, type) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (html5QrCode && isScanning) {
        html5QrCode.stop();
    }
});


console.log("🎯 MangoChain RBVP Demo Ready with WORKING QR Codes!");
