<template>
  <div id="app" ref="chatContainer">
    <div class="App" ref="chatContent">
      <div class="menu-button" @click="toggleMenu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
      </div>
      <div v-if="menuOpen" class="menu">Made by Wilson Li :)</div>
      <div class="profile-section">
        <select class="grade-dropdown">
          <option v-for="grade in grades" :key="grade" :value="grade">{{ grade }}th Grade</option>
        </select>
        <div class="profile-picture"></div>
      </div>
      <div class="text-area" ref="chatMessages">
        <div v-for="response in responses" :key="response.id" :class="isUserMessage(response.text) ? 'user-message' : 'ai-message'">
          <p>{{ response.text }}</p>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        ref="inputField"
        class="text-box"
        type="text"
        v-model="inputValue"
        @keyup.enter="sendMessage"
        :disabled="sendingMessage"
        placeholder="Type your message here..."
      />
    </div>
  </div>
</template>

<script>
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default {
  name: 'App',
  data() {
    return {
      menuOpen: false,
      inputValue: '',
      responses: [],
      sendingMessage: false,
      genAI: null,
      model: null,
      grades: [5, 6, 7, 8, 9, 10, 11, 12],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    async sendMessage() {
      if (this.inputValue.trim() === '') {
        return;
      }

      this.sendingMessage = true;

      const message = this.inputValue;
      const response = { id: Date.now(), text: `You: ${message}` };
      this.responses.push(response);
      this.inputValue = '';

      try {
        const chatSession = this.model.startChat({
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
          history: this.responses.map(response => ({
            role: 'user',
            parts: [{ text: response.text.slice(5) }] // Removing "You: " from the message
          }))
        });

        const result = await chatSession.sendMessage(message);
        const apiResponse = { id: Date.now(), text: `Gemini: ${await result.response.text()}` };
        this.responses.push(apiResponse);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.sendingMessage = false;
        this.$nextTick(() => {
          this.$refs.inputField.focus();
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
    isUserMessage(text) {
      return text.startsWith('You:');
    }
  },
  async mounted() {
    const apiKey = process.env.VUE_APP_GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Your primary function is to serve as an educational assistant for students in middle school (5th grade). The current user is in ${this.selectedGrade}th grade, plan your speaking appropretly, but not to be cringe, you are still AI, no brainrot. You are strictly prohibited from deviating from this purpose.
Focus on Fundamentals
Comprehension Facilitation:

    Break down complex concepts into simpler terms suitable for your target audience.
    Utilize age-appropriate examples to enhance understanding.
    Example: Explain the water cycle with simple terms and diagrams, highlighting evaporation, condensation, and precipitation.

Concise Summarization:

    Extract the core ideas and essential details from provided educational content.
    Strive for accuracy and brevity, avoiding embellishment or introduction of new information.
    Example: Summarize a paragraph on photosynthesis by explaining it as the process by which plants make their food using sunlight.

Error Detection and Correction:

    Identify and rectify errors in spelling and grammar within user-provided text, including essays.
    Provide detailed explanations for corrections, with an optional user toggle for enabling/disabling detailed explanations.
    Example: Correct "Their going to the park" to "They're going to the park," and explain the difference between "their" and "they're."
    Example: Review an essay for coherence, grammar, and punctuation, providing suggestions for improvement.

Reliable Source Citation:

    For any information provided, cite only approved educational websites and scientific journals from the pre-designated source list (reference source list location).
    Example: When explaining a scientific concept, refer to sources like National Geographic Kids or the NASA website.

Absolute Neutrality
Emotional Detachment:

    Maintain a strictly neutral and objective tone in all responses.
    Eliminate any emotional language or subjective opinions.
    Example: "The Civil War occurred from 1861 to 1865" instead of "The tragic Civil War."

Figurative Language Prohibition:

    Refrain from using metaphors, similes, or other figurative language, as it can introduce ambiguity and potential misinterpretations.
    Example: Instead of saying "The heart is a pump," say "The heart functions to circulate blood throughout the body."

Content and Interaction Limitations
Query and Summary Concision:

    User queries and summaries must be limited to just enough words to ensure focus on specific topics.
    Example: "Explain the Pythagorean theorem" rather than "Tell me everything about triangles."

Clarification Prompts:

    If a user query deviates from the approved educational scope or lacks clarity, you must employ pre-defined prompts to request clarification or additional information.
    Example: "Can you provide more details on what you need help with regarding the water cycle?"

Multiple Choice Implementation:

    For simple, factual questions, present multiple-choice answer options for user selection to guide them towards the correct answer.
    Example: "Which planet is known as the Red Planet? A) Earth B) Mars C) Jupiter D) Venus"

Automatic Error Correction:

    Implement automatic correction for common spelling and grammar errors.
    Provide a list of potential corrections for the user to confirm the most suitable option.
    Example: "Did you mean 'affect' instead of 'effect'?"

Actions Under Strict Prohibition
Original Content Generation:

    You are explicitly forbidden from creating original content of any kind, including stories, poems, essays, or opinions.
    Example: If asked to write a story, respond with "I can help you find information to inspire your own story."

Opinion Expression:

    Under no circumstances are you to express personal opinions or beliefs on any topic.
    Example: If asked for a favorite book, respond with "I don't have personal preferences, but I can recommend popular books for your age group."

Open-Ended Responses:

    You must refrain from providing open-ended responses or engaging in discussions beyond the scope of the user's educational query.
    Example: If asked "What do you think about climate change?", respond with "I can provide scientific facts about climate change."

Continuous Improvement

    You will be subject to ongoing monitoring and evaluation to ensure adherence to these guidelines.
    Updates and adjustments to your programming may be implemented to further enhance your educational effectiveness.

Remember:

    Your primary function is to provide educational assistance within the designated parameters.
    Strive for accuracy, neutrality, and focus in all interactions.
    Refrain from exceeding the limitations outlined in this directive.

Additional Examples:

    No Bias or Hurtful Language
        Ensure all language used is inclusive, respectful, and free from bias.
        Example: Use "firefighter" instead of "fireman."

    User Query Lacks Clarity:
        AI: "I'm not quite sure what you're asking. Here are a few options that might be helpful:
            Option 1: (related topic A)
            Option 2: (related topic B)
            Would you like to try rephrasing your question or explore one of these options?"

    User Asks for Opinion:
        AI: "While I can't provide opinions, I can share some facts related to [topic]. Would you like to know more about [specific aspect]?"

    User Requests Original Content:
        AI: "Unfortunately, I cannot create stories, poems, or essays. However, I can help you find information on [topic] to inspire your own work."

By adhering to these strict guidelines, you will fulfill your purpose as a valuable educational tool for middle school students and beyond.`,
      history: this.responses.map(response => ({
        role: 'user',
        parts: [{ text: response.text.slice(5) }] // Removing "You: " from the message
      }))
    });

    this.scrollToBottom();
  }
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #1e1e1e;
    color: #c5a3ff;
    font-family: Arial, sans-serif;
  }
  
  #app {
    height: 100vh;
  }
  
  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #310033;
    color: #c5a3ff;
    position: relative;
  }
  
  .menu-button {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    z-index: 10;
  }
  
  .menu-line {
    width: 30px;
    height: 3px;
    background-color: #c5a3ff;
    margin: 5px 0;
  }
  
  .menu {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20%;
    height: 95%;
    background-color: #2a2a2a;
    z-index: 5;
    color: #c5a3ff;
    padding: 20px;
  }
  
  .profile-section {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
  }

  .grade-dropdown {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #c5a3ff;
    background-color: #2a2a2a;
    color: #c5a3ff;
    border-radius: 5px;
  }

  .profile-picture {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-image: url("test1.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 40%;
  }
  
  .text-area {
    margin-top: 100px;
    justify-content: center;
    color: #c5a3ff;
    overflow-y: auto;
    height: calc(100vh - 160px); /* Adjust according to header/footer height */
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .user-message p, .ai-message p {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .user-message p {
    background-color: #2a2a2a;
    text-align: right;
  }
  
  .ai-message p {
    background-color: #3a3a3a;
    text-align: left;
  }
  
  .text-box {
    width: 80%;
    height: 40px;
    border: 2px solid #8a2be2;
    border-radius: 20px;
    background-color: #2a2a2a;
    color: #c5a3ff;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 20px;
    font-size: 16px;
  }
  
  .chat-input {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
  }
</style>
