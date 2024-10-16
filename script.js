// 校验码和管理员逻辑 
let isDadaFoxUsedToday = false; 
let totalDadaFoxAmount = 0; 
let totalCrabAmount = 0; 
let dailyLimit = 1; 
let minAmount = 0.00; 
let maxAmount = 1.00; 
let currentDate = getCurrentDate(); 
// 获取当前日期 
function getCurrentDate() { 
	const date = new Date(); 
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; } 
// 显示实时日期 
document.getElementById('dateDisplay').textContent = currentDate;

// 检查是否已使用达达狐抽奖
const savedDate = localStorage.getItem('dadaFoxUsedDate');
if (savedDate === currentDate) {
    isDadaFoxUsedToday = true;
}

// 抽奖按钮功能
document.getElementById('lotteryBtn').addEventListener('click', function() {
    const codeInput = document.getElementById('codeInput').value;

    // 达达狐校验码限制
    if (codeInput === 'ddh') {
        const todayTimesUsed = parseInt(localStorage.getItem('dadaFoxTimesUsed') || 0);
        if (isDadaFoxUsedToday && todayTimesUsed >= dailyLimit) {
            alert('今日已达到ddh抽奖限制！');
            return;
        } else {
            isDadaFoxUsedToday = true;
            localStorage.setItem('dadaFoxUsedDate', currentDate);
            localStorage.setItem('dadaFoxTimesUsed', todayTimesUsed + 1);
        }
    } else if (codeInput !== 'xcb') {
        alert('无效校验码！');
        return;
    }

    // 生成随机数并更新金额
    const randomAmount = (Math.random() * (maxAmount - minAmount) + minAmount).toFixed(2);
    document.getElementById('lotteryAmount').textContent = randomAmount;
    // 累计金额
    if (codeInput === 'ddh') {
        totalDadaFoxAmount += parseFloat(randomAmount);
        document.getElementById('dadaFoxTotal').textContent = totalDadaFoxAmount.toFixed(2);
    } else if (codeInput === 'xcb') {
        totalCrabAmount += parseFloat(randomAmount);
        document.getElementById('crabTotal').textContent = totalCrabAmount.toFixed(2);
    }
});

// 管理员模式点击事件
document.getElementById('adminIcon').addEventListener('click', function() {
    document.getElementById('adminModal').style.display = 'block';
});

// 关闭管理员密码输入弹窗
document.getElementById('closeAdminModal').addEventListener('click', function() {
    document.getElementById('adminModal').style.display = 'none';
});

// 管理员登录验证
document.getElementById('loginAdminBtn').addEventListener('click', function() {
    const password = document.getElementById('adminPassword').value;
    if (password === '157342') {
        document.getElementById('adminModal').style.display = 'none';
        document.getElementById('settingsModal').style.display = 'block';
    } else {
        alert('密码错误！');
    }
});

// 关闭管理员设置界面
document.getElementById('closeSettingsModal').addEventListener('click', function() {
    document.getElementById('settingsModal').style.display = 'none';
});

// 重置达达狐当日抽奖次数
document.getElementById('resetDadaFoxBtn').addEventListener('click', function() {
    localStorage.removeItem('dadaFoxTimesUsed');
    isDadaFoxUsedToday = false;
    alert('ddh当日抽奖次数已重置！');
});

// 设置达达狐每日限制抽奖次数
document.getElementById('setDadaFoxLimitBtn').addEventListener('click', function() {
    const limit = parseInt(document.getElementById('dadaFoxLimit').value);
    if (limit > 0) {
        dailyLimit = limit;
        alert('ddh每日限制抽奖次数已设置为 ' + limit);
    } else {
        alert('请输入有效的抽奖次数！');
    }
});

// 设置抽奖金额范围
document.getElementById('setAmountRangeBtn').addEventListener('click', function() {
    const min = parseFloat(document.getElementById('minAmount').value);
    const max = parseFloat(document.getElementById('maxAmount').value);
    if (min >= 0 && max > min) {
        minAmount = min;
        maxAmount = max;
        alert('抽奖金额范围已设置为 ' + min.toFixed(2) + ' 到 ' + max.toFixed(2));
    } else {
        alert('请输入有效的金额范围！');
    }
});
