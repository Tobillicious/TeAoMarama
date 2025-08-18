# KAMAR Integration Research for Te Kete Ako
*Research Date: 2025-08-06*
*Priority: HIGH - Unblocks major professional feature gap*

## Executive Summary
KAMAR is New Zealand's leading school management system (SMS) used by ~340 secondary schools. Integration is possible through their Directory Services API, which uses push-based XML/JSON messaging for real-time data synchronization.

## 1. KAMAR API Documentation & Endpoints

### Current Status
- **KAMAR Version**: 2.5.010 (updated July 2025)
- **API Type**: Directory Services API (push-based messaging)
- **Data Formats**: XML and JSON supported
- **Official Documentation**: Limited public access - requires KAMAR licensing/contact

### Directory Services Architecture
- **Push-based system**: KAMAR sends data to listening services
- **Trigger Methods**: 
  - Nightly sync of all staff/students
  - Real-time push on data changes
- **Endpoint Pattern**: Schools provide webhook URL for KAMAR to POST to
- **Example Integration**: `https://sportsground-kamar.azurewebsites.net/v1/kamar/update`

## 2. Authentication Methods & Security Requirements

### Security Framework
- **Privacy Act 2020 Compliance**: Mandatory for all integrations
- **Data Minimization**: Collect only data needed for specific service
- **Breach Disclosure**: Must notify school + Office of Privacy Commissioner
- **Access Control**: School-controlled data sharing permissions

### Authentication Pattern
- **School Configuration**: Schools configure KAMAR to send to specific endpoints
- **Webhook Security**: Likely uses shared secrets or API keys (requires direct KAMAR contact for specifics)
- **Data Validation**: Integration services must validate incoming data authenticity

## 3. Data Structures Available

### Core Data Sets (Based on Integration Examples)
- **Staff Data**: Teacher information, roles, departments
- **Student Data**: Enrollment details, class assignments, contact information
- **Timetable Data**: Class schedules, room assignments, teacher allocations
- **Course Data**: Subject codes, class groups, academic year structure

### Message Format Example
```xml
<!-- KAMAR sends XML/JSON to listening service -->
<KamarData>
  <Students>
    <Student id="..." name="..." class="..." />
  </Students>
  <Staff>
    <Teacher id="..." name="..." department="..." />
  </Staff>
  <Timetable>
    <!-- Schedule data structure -->
  </Timetable>
</KamarData>
```

## 4. Integration Architecture Recommendations

### Recommended Architecture for Te Kete Ako

```
KAMAR → Webhook Endpoint → Data Processing → Supabase Database → Te Kete Ako Frontend
```

### Component Breakdown
1. **Webhook Listener**: Netlify Function to receive KAMAR pushes
2. **Data Transformer**: Parse XML/JSON to Te Kete Ako schema
3. **Database Layer**: Supabase tables for timetables, staff, students
4. **Sync Engine**: Handle incremental updates vs full sync
5. **Frontend Integration**: Connect planning system to KAMAR data

### Technical Stack
- **Backend**: Netlify Functions (serverless)
- **Database**: Supabase (existing infrastructure)
- **Data Format**: JSON API for frontend consumption
- **Scheduling**: KAMAR-driven (real-time + nightly sync)

## 5. Existing Integrations & Best Practices

### Proven Integration Partners
1. **School-links**: Communication platform with KAMAR sync
2. **ITed Services**: Moodle-KAMAR integration specialist  
3. **Inbox Design**: KAMAR API integration services
4. **Sporty/SportsGround**: Online booking integration example

### Integration Patterns
- **Listening Service**: PHP-based webhook receivers
- **Data Sync**: Both real-time and batch processing
- **Multi-system**: Integration with Moodle, websites, booking systems

## 6. MVP Implementation Plan (2-Week Timeline)

### Phase 1: Foundation (Week 1)
**Days 1-3: Setup & Documentation**
- Contact KAMAR for Directory Services documentation access
- Set up development webhook endpoint (Netlify Function)
- Create Supabase database schema for KAMAR data

**Days 4-7: Core Integration**
- Implement webhook listener for KAMAR messages
- Build data transformation layer (XML/JSON → Supabase)
- Create basic admin interface for testing

### Phase 2: Features & Testing (Week 2)
**Days 8-10: Feature Development**
- Timetable sync with weekly planning system
- Teacher roster integration
- Student class assignment sync

**Days 11-14: Testing & Deployment**
- Test with Mangakōtukutuku College sandbox data
- Error handling and logging implementation
- Production deployment and monitoring setup

## Critical Next Steps
1. **Immediate**: Contact KAMAR for Directory Services access
2. **Technical**: Set up webhook endpoint infrastructure
3. **Partnership**: Coordinate with Mangakōtukutuku College IT team
4. **Documentation**: Access official KAMAR integration guides

## Risk Mitigation
- **API Access**: May require school IT department coordination
- **Data Privacy**: Ensure full Privacy Act 2020 compliance
- **Testing**: Use sandbox/development environment first
- **Backup Plan**: Manual CSV import as fallback option

---
*This research forms the foundation for Te Kete Ako's professional school integration capability.*