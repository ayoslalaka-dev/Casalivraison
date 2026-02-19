// Using built-in fetch from Node 22
const BASE_URL = 'http://localhost:5001/api/v1/auth';

const testUser = {
    name: 'Test User',
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
    address: '123 Test Street'
};

async function testAuth() {
    console.log('🚀 Starting Authentication Flow Test...');

    try {
        // 1. Register
        console.log('\n📝 1. Testing Registration...');
        const registerRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const registerData = await registerRes.json();
        console.log('Register Status:', registerRes.status);
        console.log('Register Response:', JSON.stringify(registerData, null, 2));

        if (registerRes.status !== 201 && registerRes.status !== 200) {
            console.error('❌ Registration failed');
        } else {
            console.log('✅ Registration successful');
        }

        // 2. Login
        console.log('\n🔑 2. Testing Login...');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });
        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Response:', JSON.stringify(loginData, null, 2));

        if (loginRes.status !== 200) {
            console.error('❌ Login failed');
            return;
        }
        console.log('✅ Login successful');
        const token = loginData.token || (loginData.data && loginData.data.token);

        if (!token) {
            console.error('❌ Token not found in login response');
            return;
        }

        // 3. Get Profile (Protected)
        console.log('\n👤 3. Testing Protected Profile Route...');
        const profileRes = await fetch(`${BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const profileData = await profileRes.json();
        console.log('Profile Status:', profileRes.status);
        console.log('Profile Response:', JSON.stringify(profileData, null, 2));

        if (profileRes.status === 200) {
            console.log('✅ Profile access successful');
        } else {
            console.error('❌ Profile access failed');
        }

    } catch (error) {
        console.error('💥 Test encountered an error:', error);
    }
}

testAuth();
