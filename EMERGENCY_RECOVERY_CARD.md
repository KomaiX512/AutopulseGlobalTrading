# 🚨 EMERGENCY IMAGE RECOVERY - QUICK REFERENCE

## ⚡ IMMEDIATE RESPONSE (First 5 Minutes)

### 1. Assess the Situation
```bash
php artisan image:health-check
```

### 2. Create Emergency Backup
```bash
php artisan image:create-checkpoint --name="emergency-$(date +%Y%m%d-%H%M%S)"
```

### 3. Restore from Latest Checkpoint
```bash
php artisan image:restore-checkpoint --checkpoint=latest
```

### 4. Verify Recovery
```bash
php artisan image:verify-integrity
```

---

## 🔧 COMMON EMERGENCY SCENARIOS

### Images Completely Missing
```bash
# Step 1: Check what's available
php artisan image:list-checkpoints

# Step 2: Restore from latest checkpoint
php artisan image:restore-checkpoint --checkpoint=latest

# Step 3: If no checkpoints, restore from database
php artisan image:restore-from-database
```

### 404 Errors on All Images
```bash
# Step 1: Generate placeholders
php artisan image:generate-placeholders

# Step 2: Rebuild image cache
php artisan image:rebuild-cache

# Step 3: Check file permissions
php artisan image:check-permissions
```

### Slow/Loading Issues
```bash
# Step 1: Optimize loading
php artisan image:optimize-loading --backup=true

# Step 2: Rebuild optimized versions
php artisan image:rebuild-optimized

# Step 3: Test frontend
php artisan image:test-frontend
```

---

## 📞 CRITICAL COMMANDS (Memorize These)

### Emergency Assessment
```bash
php artisan image:health-check --detailed
```

### Emergency Backup
```bash
php artisan image:create-checkpoint --name="emergency-$(date +%Y%m%d-%H%M%S)" --verify=true
```

### Emergency Restore
```bash
php artisan image:restore-checkpoint --checkpoint=latest --verify=true
```

### Emergency Verification
```bash
php artisan image:verify-integrity
php artisan image:test-complete
```

---

## 🛡️ PREVENTION CHECKLIST

### Daily (5 minutes)
- [ ] `php artisan image:health-check`
- [ ] Check for any 404 errors
- [ ] Verify image loading speed

### Weekly (15 minutes)
- [ ] `php artisan image:create-checkpoint --name="weekly-$(date +%Y%m%d)"`
- [ ] `php artisan image:test-complete`
- [ ] Clean old checkpoints: `php artisan image:clean-checkpoints --keep=10`

### Before Updates
- [ ] `php artisan image:create-checkpoint --name="pre-update-$(date +%Y%m%d-%H%M%S)"`
- [ ] `php artisan image:health-check --detailed`
- [ ] `php artisan image:test-restoration`

---

## 📊 SYSTEM STATUS INDICATORS

### ✅ Healthy System
- All images load without 404 errors
- Health check shows 100% integrity
- Checkpoints created successfully
- Optimization working properly

### ⚠️ Warning Signs
- Occasional 404 errors
- Slow image loading
- Health check shows < 100% integrity
- Failed checkpoint creation

### 🚨 Emergency Signs
- All images showing 404 errors
- Complete image loss
- Health check fails completely
- No checkpoints available

---

## 🔄 RECOVERY TIMELINE

### 0-5 minutes: Immediate Response
- Assess damage
- Create emergency backup
- Attempt quick restore

### 5-15 minutes: Deep Recovery
- Restore from checkpoint
- Verify integrity
- Test functionality

### 15-30 minutes: Full Recovery
- Complete system restore
- Optimize if needed
- Document incident

### 30+ minutes: Prevention
- Analyze root cause
- Update procedures
- Schedule follow-up

---

## 📞 SUPPORT CONTACTS

### System Information
- **Backup Location**: `storage/app/backups/`
- **Checkpoint Location**: `storage/app/checkpoints/`
- **Log Location**: `storage/logs/image-system.log`

### Key Files
- `app/Console/Commands/CreateImageCheckpoint.php`
- `app/Console/Commands/OptimizeImageLoading.php`
- `app/Console/Commands/TestImageCheckpoint.php`
- `database/migrations/2025_01_15_000000_create_image_checkpoints_table.php`

---

## 🎯 SUCCESS CRITERIA

### Recovery Successful When:
- ✅ All images load without errors
- ✅ Health check shows 100% integrity
- ✅ Frontend test passes
- ✅ Performance is acceptable
- ✅ No data loss occurred

### If Recovery Fails:
1. **Don't Panic** - System has multiple backup layers
2. **Document Everything** - Record all steps taken
3. **Try Alternative Methods** - Use different recovery paths
4. **Seek Help** - Contact system administrator
5. **Learn from Incident** - Update procedures

---

*Keep this card easily accessible for emergency situations*
*Last Updated: $(date)*
*Version: Emergency Card v1.0* 