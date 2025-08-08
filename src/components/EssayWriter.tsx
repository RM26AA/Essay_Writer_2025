import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Download, FileText, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const GEMINI_API_KEY = 'AIzaSyBTUQyapT_ALtGXDjVPQSeZvXnsLEGODqE';

const writingStyles = [
  { value: 'academic', label: 'Academic' },
  { value: 'university', label: 'University' },
  { value: 'college', label: 'College' },
  { value: 'high-school', label: 'High School' },
  { value: 'professional', label: 'Professional' },
  { value: 'research', label: 'Research Paper' },
];

export const EssayWriter = () => {
  const [subject, setSubject] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [wordCount, setWordCount] = useState([1500]);
  const [generatedEssay, setGeneratedEssay] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEssay = async () => {
    if (!subject.trim()) {
      toast.error('Please enter a subject title');
      return;
    }
    if (!writingStyle) {
      toast.error('Please select a writing style');
      return;
    }

    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Write a comprehensive ${writingStyle} essay about "${subject}". 
      The essay should be approximately ${wordCount[0]} words long.
      
      Requirements:
      - Follow ${writingStyle} writing standards and conventions
      - Include a strong introduction with a clear thesis statement
      - Develop multiple well-structured body paragraphs with supporting evidence
      - Conclude with a thoughtful summary that reinforces the main arguments
      - Use appropriate tone and language for ${writingStyle} level
      - Ensure proper flow and transitions between paragraphs
      
      Please provide only the essay content without any additional commentary or formatting instructions.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedEssay(text);
      toast.success('Essay generated successfully!');
    } catch (error) {
      console.error('Error generating essay:', error);
      toast.error('Failed to generate essay. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsWord = async () => {
    if (!generatedEssay) {
      toast.error('Please generate an essay first');
      return;
    }

    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: subject,
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 400 },
            }),
            ...generatedEssay.split('\n\n').map(paragraph => 
              new Paragraph({
                children: [new TextRun(paragraph.trim())],
                spacing: { after: 200 },
              })
            ),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_essay.docx`);
      toast.success('Essay downloaded successfully!');
    } catch (error) {
      console.error('Error downloading essay:', error);
      toast.error('Failed to download essay. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Academic Essay Writer
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate high-quality essays and reports with AI assistance. Perfect for academic writing across all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Essay Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Title</Label>
                <Input
                  id="subject"
                  placeholder="Enter your essay topic..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="transition-all duration-300 focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Writing Style</Label>
                <Select value={writingStyle} onValueChange={setWritingStyle}>
                  <SelectTrigger id="style" className="transition-all duration-300 focus:shadow-glow">
                    <SelectValue placeholder="Select writing style" />
                  </SelectTrigger>
                  <SelectContent>
                    {writingStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wordcount">
                  Word Count: {wordCount[0]} words
                </Label>
                <Slider
                  id="wordcount"
                  min={500}
                  max={3000}
                  step={100}
                  value={wordCount}
                  onValueChange={setWordCount}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>500</span>
                  <span>3000</span>
                </div>
              </div>

              <Button
                onClick={generateEssay}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Essay...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Essay
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Generated Essay
                </span>
                {generatedEssay && (
                  <Button
                    onClick={downloadAsWord}
                    variant="outline"
                    size="sm"
                    className="hover:shadow-glow transition-all duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Word
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedEssay ? (
                <Textarea
                  value={generatedEssay}
                  onChange={(e) => setGeneratedEssay(e.target.value)}
                  className="min-h-[500px] font-serif leading-relaxed resize-none"
                  placeholder="Your generated essay will appear here..."
                />
              ) : (
                <div className="min-h-[500px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  <div className="text-center space-y-2">
                    <FileText className="h-12 w-12 mx-auto opacity-50" />
                    <p>Your generated essay will appear here</p>
                    <p className="text-sm">Configure your settings and click "Generate Essay"</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};