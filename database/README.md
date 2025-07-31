# SkinIQ Database Setup Guide

## Database Schema Setup

### 1. Execute the Schema
1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to execute the SQL

This will create all necessary tables, indexes, RLS policies, and sample data.

### 2. Storage Setup (Optional - for image uploads)
If you want to enable image uploads, set up Supabase Storage:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `skin-images`
3. Set the bucket to private for security
4. Configure upload policies as needed

### 3. Environment Variables
Make sure your `.env` file has the correct Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Tables Overview

### Core Tables
- **`skin_quiz_sessions`** - Stores user quiz sessions with progress tracking
- **`quiz_results`** - AI analysis results and product recommendations
- **`product_catalog`** - Master catalog of skincare products
- **`user_progress`** - Progress tracking photos and user feedback
- **`image_storage`** - Metadata for uploaded skin images
- **`user_preferences`** - User preferences and settings
- **`recommendation_feedback`** - User feedback on recommendations

### Security Features
- Row Level Security (RLS) enabled on all user data tables
- Users can only access their own data
- Product catalog is publicly readable
- Automatic timestamp management

### Sample Data
The schema includes sample products that match the mock data used in the quiz:
- Gentle Foaming Cleanser ($24)
- Vitamin C + E Antioxidant Serum ($45)
- Hydrating Daily Moisturizer ($32)
- Mineral Sunscreen SPF 50 ($28)
- And more...

## Integration with the App

### Current Integration Status
The SkinIQ quiz is already integrated with the database:

1. **Session Management**: Quiz sessions are automatically created in `skin_quiz_sessions`
2. **Data Persistence**: All quiz responses are saved as users progress
3. **Results Storage**: AI analysis results are stored in `quiz_results`

### Adding to Navigation
To add the quiz to your main app navigation, you'll need to:

1. Add a route in your router configuration
2. Add a navigation link in your header/menu
3. Ensure users are authenticated before accessing

Example route addition:
```jsx
// In your router file
{
  path: '/skin-quiz',
  element: <ProtectedRoute><SkinQuiz /></ProtectedRoute>
}
```

### Dashboard Integration
You can add a quiz card to your dashboard:
```jsx
// In your Dashboard component
import { Link } from 'react-router-dom';

<Card hoverable>
  <Title level={4}>Take SkinIQ Assessment</Title>
  <p>Get personalized skincare recommendations powered by AI</p>
  <Link to="/skin-quiz">
    <Button type="primary">Start Assessment</Button>
  </Link>
</Card>
```

## API Extensions

### Future AI Integration
To integrate real AI analysis:

1. Create API endpoints for image processing
2. Integrate with AI services (Google Vision, Azure, custom models)
3. Update `ProcessingStep.jsx` to call real APIs instead of mock data
4. Store actual analysis results in `quiz_results`

### Product Recommendations
To enhance product recommendations:

1. Expand the `product_catalog` with real product data
2. Implement recommendation algorithms based on quiz responses
3. Add machine learning models for better matching
4. Include user feedback loops for continuous improvement

## Data Analytics

### Quiz Analytics
You can query the database for analytics:

```sql
-- Quiz completion rates
SELECT 
  COUNT(*) as total_sessions,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
  (COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) as completion_rate
FROM skin_quiz_sessions;

-- Average time per step
SELECT 
  current_step,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/60) as avg_minutes
FROM skin_quiz_sessions 
GROUP BY current_step;

-- Popular skin concerns
SELECT 
  concern,
  COUNT(*) as frequency
FROM (
  SELECT unnest(skin_analysis->'primaryConcerns') as concern
  FROM quiz_results
) t
GROUP BY concern
ORDER BY frequency DESC;
```

### User Progress Tracking
Track user improvements over time:

```sql
-- User progress over time
SELECT 
  user_id,
  progress_date,
  satisfaction_rating,
  concerns_improvement
FROM user_progress 
ORDER BY user_id, progress_date;
```

## Security Considerations

### Data Privacy
- All user data is protected by RLS policies
- Images should be stored securely (encrypted at rest)
- Consider HIPAA compliance for health-related data
- Implement data retention policies

### API Security
- Use Supabase's built-in authentication
- Validate all user inputs
- Rate limit API calls to prevent abuse
- Log all data access for audit trails

## Maintenance

### Regular Tasks
1. Monitor database performance and optimize queries
2. Update product catalog with new products
3. Analyze user feedback to improve recommendations
4. Back up critical data regularly
5. Update AI models based on new data

### Monitoring
Set up monitoring for:
- Quiz completion rates
- User satisfaction scores
- Database performance metrics
- Error rates and user feedback
